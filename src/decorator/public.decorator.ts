import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

// 'SkipAuth' or 'AllowAnon'
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
