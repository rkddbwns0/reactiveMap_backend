import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GoogleMapsController } from 'src/controller/googlemaps.controller';
import { GoogleMapsService } from 'src/service/google-maps.service';

@Module({
  imports: [HttpModule],
  providers: [GoogleMapsService],
  controllers: [GoogleMapsController],
})
export class GoogleMapsModule {}
