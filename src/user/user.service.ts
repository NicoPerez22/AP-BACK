import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './dto/user.entity';
import { ApiResponse } from 'shared/models/apiResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(data: { name: string; email: string }) {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async getUserByID(id) {
    const apiResponse = new ApiResponse<User>();
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) {
      return Object.assign(apiResponse, {
        data: null,
        httpCode: HttpStatus.OK,
        message: 'No se encontró el usuario',
      });
    }

    return Object.assign(apiResponse, {
      data: userFound,
      httpCode: HttpStatus.OK,
      message: 'El usuario fue encontrado con éxito',
    });
  }
}
