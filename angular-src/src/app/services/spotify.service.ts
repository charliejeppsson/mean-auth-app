import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private redirect_uri: string;
  private client_id = '8d1e1fb310d54ab883b518bbaefa027b';
  private client_secret = 'c12b32b509b246f8a7cdf070bf0e3dbf';
  private access_token: string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'BQDGkTn4SAoF7h9kiJKVxOJTvYuzGm3QDmGFzR3s196d7XZDHIcRr4rz032N7QnzCDK6eaIXWszTGokjodBwKh08EXh3GyRJaeynNenQd5e9tDhuA83FVrkt1Da0ttjoF1_pwmefzvk';

  constructor(private http:Http) {

  }

  getToken(){
    // let params : URLSearchParams = new URLSearchParams();
    // params.set('grant_type' , 'client_credentials');
    // let body = params.toString();
    var params = ('grant_type=client_credentials');

    var headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);

    headers.append('Content-Type' , 'application/x-www-form-urlencoded');

    return this.http.post('https://accounts.spotify.com/api/token', params, {headers : headers} )
      .map(res=> res.json());
  }

  searchMusic(str:string, type='artist', token:string){
    console.log(this.encoded);
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    return this.http.get(this.searchUrl , {headers : headers})
      .map((res: Response) => res.json())

  }
}
