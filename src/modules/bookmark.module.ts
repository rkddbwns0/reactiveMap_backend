import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkController } from 'src/controller/bookmark.controller';
import { Bookmark } from 'src/entities/bookmark';
import { User } from 'src/entities/user';
import { BookmarkService } from 'src/service/bookmark.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkModule {}
