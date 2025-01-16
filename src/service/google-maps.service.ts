import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // firstValueFrom을 임포트합니다.

@Injectable()
export class GoogleMapsService {
  private readonly apiKey: string = process.env.GOOGLE_API_KEY;
  constructor(private readonly httpService: HttpService) {}
  async getPlaceDetails(address: string): Promise<any> {
    console.log('address 주소 값은요!!', address);

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=photos&key=${this.apiKey}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data',${error.message}`);
    }
  }
}
