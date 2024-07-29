import { Controller, Get, Param } from '@nestjs/common';
import { WordService } from './word.service';

@Controller('Words')
export class WordController {
  constructor(readonly service: WordService) { }

  @Get('')
  async getMany() {
    const Words = await this.service.repo.find();
    return Words;
  }

  @Get()
  async getManyWit() {
    // return await this.service.repo.find({ take: 300 });
    // return await this.service.repo.find({ where: { eyeChecked: false, downloadedAt: Not(IsNull()) }, take: 300 });
    return await this.service.repo.find();
    // return await this.service.repo.find({
    //   where: {
    //     ID: 'd27e4b6f-c19c-4ea6-a2df-b922258cc2ac',
    //     eyeChecked: false,
    //     downloadedAt: Not(IsNull()),
    //     isBannedMessage: IsNull(),
    //     originalUrl: Like('%funnyariron%'),
    //   },
    //   take: 300,
    // });
  }

  // @Get('/unsseen')
  // async getUnchecked() {
  //   const attachment = await this.service.repo.find({ where: { meta } });
  //   console.log('attachment');
  //   console.log(attachment);
  //   return attachment;
  // }
  @Get(':id')
  async getById(@Param('id') ID: string) {
    return await this.service.repo.findOneOrFail({ where: { ID } });
  }
}
