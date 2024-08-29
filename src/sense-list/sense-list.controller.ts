import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SenseList } from './entities/sense-list.entity';
import { SenseListService } from './sense-list.service';

@Crud({
  model: {
    type: SenseList,
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
  constructor(public service: SenseListService) { }
}
