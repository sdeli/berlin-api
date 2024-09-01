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
    });
    return res;
  }
}
