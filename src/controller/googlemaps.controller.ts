import { Controller } from '@nestjs/common';
import { GoogleMapsService } from 'src/service/google-maps.service';
import { Get, Query } from '@nestjs/common';
@Controller('google-maps')
export class GoogleMapsController {
  constructor(private readonly googleMapsService: GoogleMapsService) {}

  @Get('place-details')
  async getPlaceDetails(@Query('address') address: string) {
    if (!address) {
      throw new Error('Address parameter is required');
    }
    try {
      // console.log('address값은', address);
      const placeDetails =
        await this.googleMapsService.getPlaceDetails(address);
      console.log('placeDetails는', placeDetails);
      return placeDetails;
    } catch (error) {
      throw new Error(`Error fetching place details,${error.message}`);
    }
  }
}
