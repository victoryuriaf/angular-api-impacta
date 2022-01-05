// imports necessários para a API
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../shared/employee";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()

export class RestApiService {
// definindo o caminho para a base de dados
  apiURL: string = 'http://localhost:3000'

// fazendo a referencia de instancia de classe HttpClient
  constructor(private http:HttpClient) { }

// criando as credenciais de acesso para modificar a base de dados
  authorizationAccess = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  /*
  =====================================================================
          CONSTRUINDO A API E SEUS RESPECTIVOS MÉTODOS
  =====================================================================
  */

// aqui o método vai trazer TODOS os dados contidos na base (GET)
  getEmployees(): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + '/employees')
    .pipe(
      retry(1),
      catchError(this.treatError)
    )
  }

// método para recuperar UM ÚNICO registro da base de dados (GET + id)
  getEmployee(id:any): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe(
      retry(1),
      catchError(this.treatError)
    )
  }

// método para INSERIR dados na base (POST)
  createEmployee(employee:any): Observable<Employee>{
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee),
    this.authorizationAccess)
    .pipe(
      retry(1),
      catchError(this.treatError)
    )
  }

// método para atualizar UM REGISTRO da base por vez (PUT + id)
  updateEmployee(id:any, employee:any): Observable<Employee>{
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee),
    this.authorizationAccess)
    .pipe(
      retry(1),
      catchError(this.treatError)
    )
  }

// método de EXCLUSÃO de registro (DELETE)
  deleteEmployee(id:any){
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, 
    this.authorizationAccess)
    .pipe(
      retry(1),
      catchError(this.treatError)
    )
  }
// criando a funcao para tratar os erros nas aplicações front e backend
  treatError(err:any){
  // propriedade para receber um valor textual referente ao erro ocorrido
    let messageError = ''
  // verificar qual é o local onde o erro ocorre
    if (err.error instanceof ErrorEvent){
  // tratando o erro -> aqui o erro ocorreu no frontend
      messageError = err.error.message
    } else {
  // tratando o erro -> aqui o erro ocorreu no backend
      messageError = `Error code: ${err.status}\n Error message: ${err.message}`
    }

  // exibindo o erro em uma mensagem de alerta
    window.alert(messageError)
    return throwError(() => messageError)
  }
}