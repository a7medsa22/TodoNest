import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { CURRENT_USER_KEY } from "src/util/constant";


export const CurrentUser = createParamDecorator((data,ctx:ExecutionContext)=>{
   const request = ctx.switchToHttp().getRequest();
   
   return request[CURRENT_USER_KEY];
})