import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LecServiceService } from '../../services/lec-service.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { templateJitUrl } from '@angular/compiler';

import { NavController,AlertController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-lec-detail',
  templateUrl: './lec-detail.page.html',
  styleUrls: ['./lec-detail.page.scss'],
})
export class LecDetailPage implements OnInit {


  SiteCode = null;
  RoomTimeSeq = null;
  LecDate = null;
  TeacherSeq: number;

  SetRoomInfo: any= {};
  SetStudnet: any;

  curDate: String = new Date().toISOString().substring(0,10);

  constructor(
    private activatedRoute: ActivatedRoute,
    private lecService: LecServiceService,
    private storegeService: StorageServiceService,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {

    this.storegeService.getStoredData().then(data => {
      this.TeacherSeq = data.EmployeeSeq;
    });

    this.SiteCode = this.activatedRoute.snapshot.paramMap.get('s');
    this.RoomTimeSeq = this.activatedRoute.snapshot.paramMap.get('r');
    this.LecDate = this.activatedRoute.snapshot.paramMap.get('d');
    
    this.getRoomDetail();
   }

  ngOnInit() {
    //this.lecService.LoadingPresent();
  }

  logoutUser(){
    this.toastCtrl.dismiss().then(()=>{});
    this.storegeService.logout();
  }

  getRoomDetail(){

    
    this.lecService.LoadingPresent();

    this.lecService.s_getRoomDetail(this.RoomTimeSeq).then(res => {      

      this.SetRoomInfo = res.data[0];
      this.getRoomDetail_List();

    }).catch(err => {
      console.log(err);
    });
  }

  //출결학생 목록
  getRoomDetail_List(){

    this.lecService.s_getRoomDetail_List(this.SiteCode,this.RoomTimeSeq,this.LecDate).then(res => {
      //console.log(res.data);
      this.SetStudnet = res.data;  

      this.lecService.LoadingDismiss();
    }).catch(err => {
      console.log(err);
    });

  }

  setBackButtonAction(){
    this.toastCtrl.dismiss().then(()=>{});
    this.navCtrl.pop();
  }  

  presentToast(msg:string) {
    this.toastCtrl.create({
      message: msg,
      animated: true,
      showCloseButton: true,
      closeButtonText: "X",
      cssClass: "my-toast",
      position: "middle"
    }).then((obj) => {
      obj.present();
    });
  
  }

  showOnceToast(msg: string){
    this.toastCtrl.dismiss().then((obj)=>{
    }).catch(()=>{
    }).finally(()=>{
      if(msg != ''){
        this.presentToast(msg);    
      }
      
    });
  }


  isChecked(attState: any,attType:string){
    let answer = (attState === attType) ? true : false;
    return answer;

  }


  ChkAttend(){
    var strJson = "";
    var getStudentSeq = <any>document.getElementsByName('StudentSeq');
 
    strJson+='{"SiteCode":"'+this.SiteCode+'"';
    strJson+=',"TeacherSeq":"'+this.TeacherSeq+'"';
    strJson+=',"RoomTimeSeq":"'+this.RoomTimeSeq+'"';
    strJson+=',"ShortName":"'+this.SetRoomInfo.ShortName+'"';
    strJson+=',"RoomSeq":"'+this.SetRoomInfo.RoomSeq+'"';
    strJson+=',"OpenDate":"'+this.SetRoomInfo.OpenDate+'"';
    strJson+=',"EndTime":"'+this.SetRoomInfo.EndTime+'"';
    strJson+=',"BeginTime":"'+this.SetRoomInfo.BeginTime+'"';
    strJson+=',"LecDate":"'+this.LecDate+'"';
    strJson+=',"ItemSeq":"'+this.SetRoomInfo.ItemSeq+'"';
    strJson+=',"data":[';    
    
    let addComma : string = "";
    let cnt=0;
    let chkDataCnt = <any>document.getElementsByClassName('dtChk').length - getStudentSeq.length;
    for(let i=0; i<getStudentSeq.length;i++){
      let chkData = <any>document.getElementsByName('chk'+getStudentSeq[i].value);
      let AttSeq = <any>document.getElementsByName('AttSeq'+getStudentSeq[i].value);

      if(i != 0){
        addComma=",";
      }          
      for(let j=0;j<chkData.length;j++){

        if(chkData[j].checked == false){
          cnt = cnt+1
        }

        if(chkData[j].checked){
          strJson+=addComma+'{"StudentSeq":"'+getStudentSeq[i].value+'","State":"'+chkData[j].value+'","AttSeq":"'+AttSeq[0].value+ '"}';
        }

      }      
    }
    strJson+="]}";

    if(chkDataCnt != cnt){
      this.ChkAttendAlert('출석체크를 하지 않은\n학생이 있습니다.');
      return;
    }

    this.ChkAttendConfirm(strJson);

  }


  async ChkAttendAlert(msg: string){
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: '확인'
        }
      ]
    });
    await alert.present();
  }

  async ChkAttendConfirm(getData: any) {
    const alert = await this.alertCtrl.create({
      message: '체크된 정보대로 출석체크 하시겠습니까?',
      buttons: [
        {
          text: '아니오',
          role: '아니오',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('컨펌취소');
          }
        }, {
          text: '예',
          handler: () => {
            this.lecService.s_SetChkAttend(getData).then(res => {
              //this.getRoomDetail();

              if(res.result=="success"){
                this.ChkAttendAlert('출석데이터가 저장되었습니다.');
                this.getRoomDetail();
              }
            }).catch(err => {
              this.ChkAttendAlert(err);
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
