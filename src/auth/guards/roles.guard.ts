import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/util/user-role.enum";

export class RolesGuard implements CanActivate{
    constructor(private reflactor:Reflector ){}

    canActivate(context: ExecutionContext) :boolean  {
      const  requireRoles = this.reflactor.getAllAndOverride<UserRole[]>('roles',
        [context.getHandler(),context.getClass()]);
        if(!requireRoles) return true;

        const {user} = context.switchToHttp().getRequest();
        const hasRole = requireRoles.some((role)=>user.role===role);
        if (!hasRole) {
      throw new ForbiddenException('Insufficient permissions');
    }
    return hasRole;
}
}
