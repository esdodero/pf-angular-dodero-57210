import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../modules/dashboard/users/models';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let router: Router;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MockProvider(Router)],
    });

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Al llamar login, debe redireccionar al dashboard', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    const mockUser: User = {
      id: 'JHDU6',
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@example.com',
      password: '123456',
      token: 'mock-token',
      role: 'ADMIN'
    };

    // Llamada al método login con datos de prueba
    service.login({ email: 'test@example.com', password: '123456' });

    // Mockear la respuesta del HttpClient
    const req = httpController.expectOne(environment.apiUrl + '/users?email=test@example.com&password=123456');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]); // Simula una respuesta con un usuario

    // Verificar que la navegación ocurrió
    expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    // Verificar que se almacenó el token
    expect(localStorage.getItem('token')).toBe('mock-token');
  });

});