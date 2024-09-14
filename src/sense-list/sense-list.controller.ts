import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SenseList } from './entities/sense-list.entity';
import { SenseListService } from './sense-list.service';
import { CreateSenseListDto } from 'src/auth/dto';
import { UsersService } from 'src/users/users.service';
import { AddSenseToWordlistsDto } from './dto';
import { SenseLineService } from 'src/word/sense-line.service';

@Crud({
  model: {
    type: SenseList,
  },
  params: {
    id: {
      field: 'ID', // Make sure this matches the entity field name
      type: 'uuid', // Ensure this matches the expected type
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

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.deleteOneById(id);
  }

  @Get('by-user')
  async getOnByUserId(@Param('userId') userId: string): Promise<SenseList[]> {
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
