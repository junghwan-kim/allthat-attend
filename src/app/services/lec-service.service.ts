import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

let lec_url = 'http://lec.koreagroupware.com//rest_api/lecture_list_ajax.asp';
let lec_date_url = 'http://lec.koreagroupware.com/rest_api/lec_date_ajax.asp'; 
let lec_detail_url = 'http://lec.koreagroupware.com/rest_api/lec_detail_room_ajax.asp'; 
let lec_detail_list_url = 'http://lec.koreagroupware.com/rest_api/lec_detail_list_ajax.asp'; 
let ckAtt_url = 'http://lec.koreagroupware.com/rest_api/CheckAttend_ajax.asp';

@Injectable({
  providedIn: 'root'
})
export class LecServiceService {


  isLoading = false;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController
    ) { }

 

  s_getSelectDate(TeacherSeq: number): Promise<any> {
    let url = `?TeacherSeq=${TeacherSeq}`;
    return new Promise((resolve, reject) => {
      this.http.get(lec_date_url+url,{}).subscribe(res => {
          resolve(res);
          
      }, (err) => {
        reject(err);
        console.log(err)
        });
      });
  }

  s_getSearchData(SiteCode: string, placeSeq: number, TeacherSeq: number, LectureDate: string): Promise<any> {
    let url = `?SiteCode=${SiteCode}&PlaceSeq=${placeSeq}&TeacherSeq=${TeacherSeq}&LectureDate=${LectureDate}`;
    
    return new Promise((resolve, reject) => {
      this.http.get(lec_url+url,{}).subscribe(res => {
          resolve(res);
          console.log(res); 
      }, (err) => {
        reject(err);
        console.log(err)
        });
      });
  }


  s_getRoomDetail(RoomTimeSeq:number): Promise<any> {
    let url = `?RoomTimeSeq=${RoomTimeSeq}`;
    return new Promise((resolve, reject) => {
      this.http.get(lec_detail_url+url,{}).subscribe(res => {
        resolve(res);
        //console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
        });
      });   
  }


  s_getRoomDetail_List(SiteCode:string, RoomTimeSeq: number, LecDate: string): Promise<any> {
    let url = `?SiteCode=${SiteCode}&RoomTimeSeq=${RoomTimeSeq}&LecDate=${LecDate}`;
    return new Promise((resolve, reject) => {
      this.http.get(lec_detail_list_url+url,{}).subscribe(res => {
        resolve(res);
        //console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
        });
      });   

  }


  s_SetChkAttend(getDate: any): Promise<any>{

    let url = `?data=${getDate}`;
  
    //console.log(getDate);

    return new Promise((resolve, reject) => {
      this.http.get(ckAtt_url+url,).subscribe(res => {
        resolve(res);
        //console.log(res);
      }, (err) => {
        reject(err);
        console.log(err);
        });
      });

  }


  


  async LoadingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        //console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async LoadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

}
