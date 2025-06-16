import { Controller, Get, Patch, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ 
    summary: 'Perfil do usuário',
    description: 'Retorna dados do perfil do usuário autenticado'
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil retornado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso inválido',
  })
  getProfile(@Request() req) {
    return this.usersService.findProfile(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ 
    summary: 'Atualizar perfil',
    description: 'Atualiza dados do perfil do usuário autenticado'
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Token de acesso inválido',
  })
  updateProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.id, updateData);
  }
}

