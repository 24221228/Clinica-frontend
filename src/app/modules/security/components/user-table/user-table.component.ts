import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { UpdateUserDto } from 'src/app/core/presentation/interfaces/UpdateUserDto';
import { Person } from 'src/app/core/presentation/interfaces/login.interface';
import { UsersService } from 'src/app/core/presentation/services/users/users.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() dataPerson: Person[] = [];
  @Input() statusValueUpdate: boolean = false;
  @Output() userStatusUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UsersService,
    private toastService: ToastrService) {}

  updateUserStatus(person: Person){
    let idUser = person.user.id;
    let updateUserDto: UpdateUserDto = {
      estatus: this.statusValueUpdate
    }
    /*this.userService.update(idUser, updateUserDto).subscribe(
      (_user) => {
        if(this.statusValueUpdate == true){
          this.toastService.success(`!La cuenta del usuario ${person.nombres} fue activada satisfactoriamente!`)
        }else{
          this.toastService.success(`!La cuenta del usuario ${person.nombres} fue desactivada satisfactoriamente!`)
        }
        this.userStatusUpdated.emit();
      },
      (error) => {
        this.toastService.error(`Error al actualizar el usuario: ${error}`);
      }
    );*/
    this.userService.update(idUser, updateUserDto).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.error && error.error.message) {
          // Manejar el error "Usuario no encontrado" aquí
          this.toastService.error("Usuario no encontrado");
        } else {
          // Propagar otros errores
          throw error;
        }
        return of(null);
      })
    ).subscribe(
      () => {
        if(this.statusValueUpdate == true){
          this.toastService.success(`!La cuenta del usuario ${person.nombres} fue activada satisfactoriamente!`)
        }else{
          this.toastService.success(`!La cuenta del usuario ${person.nombres} fue desactivada satisfactoriamente!`)
        }
        // Emitir el evento userStatusUpdated después de actualizar el estado del usuario
        this.userStatusUpdated.emit();
      },
      (error) => {
        if (!(error instanceof HttpErrorResponse) || !error.error || !error.error.message) {
          // Mostrar el error solo si no es un error "Usuario no encontrado"
          this.toastService.error(`Error al actualizar el usuario: ${error}`);
        }
      }
    );
  }
  
}
