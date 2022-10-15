import { Component } from '@angular/core';
import { APIClientService } from '../services/apiclient.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user:any;
  users:any;
  posts:any;
  post:any={
    id:null,
    title:"",
    body:"",
    userId:null
  };
  compareWith:any;
  constructor(private api: APIClientService) {}
  ionViewWillEnter(){
    this.getUsuarios();
    this.getPosts();
  }
  getUsuario(userId){
    this.api.getUsuario(userId).subscribe((data)=>{
      console.log(data)
      this.user=data;
    });
  }
  getUsuarios(){
    this.api.getUsuarios().subscribe((data)=>{
      this.users=data;
    });
  }
  getPosts(){
    this.api.getPosts().subscribe((data)=>{
      this.posts=data;
      this.posts.reverse();
    });
  }
  guardarPost(){
    if(this.post.userId==null){
      if(this.user==undefined){
        console.log("Seleccione un usuario");
        return;
      }
      this.post.userId=this.user.id;
      this.api.createPost(this.post).subscribe(
        ()=>{
          console.log("Creado Correctamente");
          this.getPosts();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
    else{
      this.api.updatePost(this.post.id,this.post).subscribe(
        ()=>{
          console.log("Actualzado Correctamente");
          this.getPosts();
        },
        error=>{
          console.log("Error "+error)
        }
      );
    }
  }
  setPost(_post){
    this.post=_post;
    this.getUsuario(_post.userId);
    this.compareWith = this.compareWithFn;
  }
  eleminarPost(_post){
    console.log("eeliminar")
    this.api.deletePost(_post.id).subscribe(
      success=>{
        console.log("Eliminado correctamente");
        this.getPosts();
      },
      error=>{
        console.log("Error "+error)
      }
    )
  }
  compareWithFn = (o1, o2) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  
  
}
