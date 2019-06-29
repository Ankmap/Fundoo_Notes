/*****************************************************************************************************
 *@Purpose - FundoNotes.
 *@file    - http.service.ts
 *@author  - Ankita Mapari <mapariit@gmail.com>
 *@version - 1.0
 *@since   - 22/04/2019
**************************************************************************************************/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * @Purpose : Login, registration, forgotPassword
   **/
  postData(path, body) {
    return this.http.post(environment.baseUrl + path, body);
  }

  /**
   * @Purpose : Reset Passwoprd
   **/
  getEncodData(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  postDataForEncodedReset(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, this.getEncodData(body), httpOptions);
  }


  /**
   * @Purpose : Add Note
   **/
  postDataForEncoded(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /** 
   * @Purpose : Logout
   **/
  postDataForJSON(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }

  /**
   * @Purpose : get data and access without refresh
   **/
  getdDta(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : change color
   **/
  chnageColor(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Delete Note
   **/
  deleteNote(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose :  Add label
   **/
  postDataForAddLabel(path, body) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, body, httpAuthOptions);
  }

  /**
   * @Purpose : Show Label
   **/
  postDataForShowLabel(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : Collabarator Search User
   **/
  postDataForSearchUser(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Update Note
   **/
  postDataForUpdateNote(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, this.getEncodData(body), httpOptions);
  }

  /**
   * @Purpose : Delete Label
   **/
  postDataForDeleteLabel(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.delete(environment.baseUrl + path, httpAuthOptions);
  }


  /**
   * @Purpose : Remove Collaborators To Notes
   **/
  postDataForRemoveCollaboratorsToNotes(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.delete(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose :  Update Label
   **/
  postDataForUpdateLabel(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Archive Note
   **/
  postDataForArchiveNote(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Archive Note Get List
   **/
  postDataForArchiveNoteGetList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Chnage Reminder
   **/
  chnageReminder(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Remove Reminder Notes
   **/
  removeReminderNotes(path, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Get reminder Notes List
   **/
  postDataForgetReminderNotesList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Trash Note
   **/
  postDataFortrashNote(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : Get Trash Notes List
   **/
  postDataForgetTrashNotesList(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Upload Profile Image
   **/
  postDataForuploadProfileImage(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
  * @Purpose : Add Label To Notes
  **/
  postDataForaddLabelToNotes(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Remove Label To Notes
   **/
  postDataForremoveLabelToNotes(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Get Notes List By Label
   **/
  postDataForGetNotesListByLabel(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : pin Unpin Notes
   **/
  postDataForpinUnpinNotes(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Question And Answer Notes
   **/
  postDataquestionAndAnswerNotes(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Question And Answer Notes Add
   **/
  postDatagetNotesDetail(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ************>', localStorage.getItem('token'));
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
 * @Purpose : Question And Answer Notes Delete 
 **/
  postDataForDeleteQuestion(path) {
    let httpAuthOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.delete(environment.baseUrl + path, httpAuthOptions);
  }

  /**
   * @Purpose : get user service
   **/
  postDataForuserService(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(environment.baseUrl + path, httpOptions);
  }
  /**
   * @Purpose : Add product to cart
   **/

  postDataaddToCart(path, body) {
    console.log('add to cart data in http ====>', body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

  /**
   * @Purpose : Get cart details according selection
   **/
  postDatagetCartDetails(path) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.get(environment.baseUrl + path, httpOptions);
  }

  /**
   * @Purpose : Question And Answer Notes
   **/
  postDataproductcartsComplete(path, body) {
    console.log(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      })
    };
    console.log('token ==================>', localStorage.getItem('token'));
    return this.http.post(environment.baseUrl + path, body, httpOptions);
  }

}
