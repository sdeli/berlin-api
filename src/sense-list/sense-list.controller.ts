import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SenseList } from './entities/sense-list.entity';
import { SenseListService } from './sense-list.service';
import { CreateSenseListDto, SenseListDto } from 'src/auth/dto';
import { UsersService } from 'src/users/users.service';
import { AddSenseToWordlistsDto, AddWordToSearchHistoryDto } from './dto';
import { SenseLineService } from 'src/word/sense-line.service';
import { WordService } from 'src/word/word.service';
import { SenseLine } from 'src/word/entities/sense-line.entity';

@Crud({
  model: {
    type: SenseList,
  },
  params: {
    id: {
      field: 'ID',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      senseLines: {
        eager: true,
      },
      belongsTo: {
        eager: true,
      },
    },
  },
})
@Controller('sense-list')
export class SenseListController implements CrudController<SenseList> {
  constructor(
    public service: SenseListService,
    private usersService: UsersService,
    private senseLineService: SenseLineService,
    private wordService: WordService,
    private senseListService: SenseListService,
  ) { }

  @Post()
  async save(@Body() dto: CreateSenseListDto): Promise<SenseList> {
    const duplicateList = await this.service.findOne({
      where: { title: dto.title },
    });
    if (duplicateList) {
      throw new BadRequestException(
        'There is a list already with the title: ' + dto.title,
      );
    }

    const user = await this.usersService.repo.findOne({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new BadRequestException('User does not exist with id');
    }

    const newList = new SenseList();
    newList.title = dto.title;
    newList.belongsTo = user;

    try {
      const savedNewlist = await this.service.repo.save(newList);
      return savedNewlist;
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected error occurred while saving user',
      );
    }
  }

  @Put()
  async updateWordList(@Body() dto: SenseListDto): Promise<SenseList> {
    const listToUpdate = await this.service.findOne({
      where: { ID: dto.ID },
      relations: ['senseLines'],
    });

    if (!listToUpdate) {
      throw new BadRequestException();
    }

    listToUpdate.title = dto.title;
    try {
      await this.service.repo.save(listToUpdate);
      return listToUpdate;
    } catch (error) {
      throw new InternalServerErrorException(
        'An unexpected error occurred while updating list',
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.deleteOneById(id);
  }

  @Get('by-user')
  async getOnByUserId(@Query('userId') userId: string): Promise<SenseList[]> {
    if (!userId) throw new BadRequestException();

    const res = await this.service.find({
      where: {
        belongsTo: { id: userId },
      },
      relations: ['senseLines'],
    });
    return res;
  }

  @Post('add-sense')
  async addSenseToWordlists(
    @Body() dto: AddSenseToWordlistsDto,
  ): Promise<SenseList> {
    const list = await this.service.findOne({
      where: {
        ID: dto.listId,
      },
      relations: ['senseLines'],
    });
    if (!list) {
      throw new BadRequestException('invalid dto.listId:' + dto.listId);
    }

    const line = await this.senseLineService.findOne({
      where: {
        ID: dto.lineId,
      },
    });

    if (!line) {
      throw new BadRequestException('invalid dto.lineId:' + dto.lineId);
    }
    if (!list.senseLines) list.senseLines = [];
    const duplicateSense = await list.senseLines.find(
      (sense) => sense.ID === line.ID,
    );
    if (duplicateSense) return list;

    list.senseLines = [...list.senseLines, line];
    const updatedList = await this.service.repo.save(list);
    return updatedList;
  }

  @Post('history')
  async addWordToSearchHistory(
    @Body() dto: AddWordToSearchHistoryDto,
  ): Promise<void> {
    console.log('addWordToSearchHistory');
    const { userId, wordId } = dto;
    const user = await this.usersService.repo.findOne({
      where: { id: userId },
    });

    if (!user) throw new BadRequestException();

    const historyList = await this.senseListService.repo.findOne({
      where: { belongsTo: user, title: 'Search History' },
      relations: ['senseLines'],
    });
    if (!historyList) throw new BadRequestException();
    const word = await this.wordService.repo.findOne({
      where: {
        ID: wordId,
      },
      relations: ['senses', 'senses.lines'],
    });
    if (!word) throw new BadRequestException();
    let defaultLine: SenseLine;
    try {
      defaultLine = word.senses[0].lines[0];
    } catch (error) {
      throw new BadRequestException();
    }

    if (!historyList.senseLines) historyList.senseLines = [];
    historyList.senseLines = [defaultLine, ...historyList.senseLines];
    await this.senseListService.repo.save(historyList);
  }

  @Post('remove-sense')
  async removeSenseFromWordlists(
    @Body() dto: AddSenseToWordlistsDto,
  ): Promise<SenseList> {
    const list = await this.service.findOne({
      where: {
        ID: dto.listId,
      },
      relations: ['senseLines'],
    });
    if (!list) {
      throw new BadRequestException('invalid dto.listId:' + dto.listId);
    }

    const line = await this.senseLineService.findOne({
      where: {
        ID: dto.lineId,
      },
    });

    if (!line) {
      throw new BadRequestException('invalid dto.lineId:' + dto.lineId);
    }
    if (!list.senseLines) list.senseLines = [];
    const filteredLines = await list.senseLines.filter(
      (sense) => sense.ID !== line.ID,
    );

    list.senseLines = filteredLines;
    const updatedList = await this.service.repo.save(list);
    return updatedList;
  }
}
