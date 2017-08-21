import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;
  private redirect_uri: string;
  private client_id = '8d1e1fb310d54ab883b518bbaefa027b';
  private client_secret = 'c12b32b509b246f8a7cdf070bf0e3dbf';
  private access_token: string;
  private encoded = btoa(this.client_id + ':' + this.client_secret);
  private base64 = 'BQDGkTn4SAoF7h9kiJKVxOJTvYuzGm3QDmGFzR3s196d7XZDHIcRr4rz032N7QnzCDK6eaIXWszTGokjodBwKh08EXh3GyRJaeynNenQd5e9tDhuA83FVrkt1Da0ttjoF1_pwmefzvk';

  constructor(private http:Http) {

  }

  // The authorization flow the Spotify API uses is the Authorization Code Flow. This flow first gets a code from the Spotify Accounts Service, then exchanges that code for an access token.
  getToken(){
    var params = ('grant_type=client_credentials');

    var headers = new Headers();
    headers.append( 'Authorization', 'Basic ' + this.encoded);
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.post('https://accounts.spotify.com/api/token', params, {headers : headers} )
      .map(res=> res.json());
  }

  searchMusic(str:string, type='artist', token:string){
    console.log(this.encoded);
    this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(this.searchUrl , {headers : headers})
      .map((res: Response) => res.json())
  }

  getArtist(id:string, token:string){
    this.artistUrl = 'https://api.spotify.com/v1/artists/'+ id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(this.artistUrl , {headers : headers})
      .map((res: Response) => res.json())
  }

  getAlbums(artistId:string, token:string){
    this.albumsUrl = 'https://api.spotify.com/v1/artists/'+ artistId +'/albums';
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(this.albumsUrl , {headers : headers})
      .map((res: Response) => res.json())
  }

  getAlbum(id:string, token:string){
    this.albumUrl = 'https://api.spotify.com/v1/albums/'+ id;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(this.albumUrl , {headers : headers})
      .map((res: Response) => res.json())
  }


}
