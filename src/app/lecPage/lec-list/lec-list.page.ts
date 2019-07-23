import { Component, OnInit } from '@angular/core';
import { LecServiceService } from '../../services/lec-service.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { NavController,AlertController } from '@ionic/angular';



@Component({
  selector: 'app-lec-list',
  templateUrl: './lec-list.page.html',
  styleUrls: ['./lec-list.page.scss'],
})
export class LecListPage implements OnInit {

  results: any;
  selectOption: any;
  selLecDate: any;
  
  public LoginUser: any = {};
  SiteCode: string;
  placeSeq: number;
  TeacherSeq: number;

  constructor(
    private lecService: LecServiceService,
    private storegeService: StorageServiceService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    ) { 
      this.storegeService.getStoredData().then(data => {
        this.LoginUser = data;
        this.SiteCode = data.SiteCode;
        this.placeSeq = data.PlaceSeq;  
        this.TeacherSeq = data.EmployeeSeq;

        this.selectDateBind();

      });
    }

  ngOnInit() {    
    
  }

  selectDateBind(){
    
    
    this.lecService.s_getSelectDate(this.TeacherSeq).then(res =>{

      
      if(res.result =="fail"){
        this.errAlert('수업이 없습니다.');        
      } else {
        this.lecService.LoadingPresent();
        this.selectOption = res.data
        this.selLecDate = res.data[0].LectureDate; //select 초기값 selected
      }
      //console.log(res.result);

    }).catch(err =>{
      console.log(err);
    });

  }

  searchChanged(){
    
    this.lecService.s_getSearchData(this.SiteCode,this.placeSeq,this.TeacherSeq,this.selLecDate).then(res =>{
      this.results =res.data;

      this.lecService.LoadingDismiss();

    }).catch(err => {
      console.log(err);
    });
  }

  logoutUser(){
    this.storegeService.logout();
  }

  async errAlert(msg: string){
    const alert = await this.alertCtrl.create({
      header: '',
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: '확인',
          handler:() => {
            this.logoutUser();
          }
        }
      ]
    });
    await alert.present();
  }

}
