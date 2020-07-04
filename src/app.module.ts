import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/recipe',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
    RecipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
