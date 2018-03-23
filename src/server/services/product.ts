import { ProductDto } from '../../views/dto/product/product'
import { ProductModel } from '../dataAccess/models/product'
import { Product } from '../domain/product'
import { Repository } from '../repository'

export class ProductService {
  products = new Repository(ProductModel)

  constructor() {
    this.generateSampleData()
  }

  async topTenList(): Promise<ProductDto[]> {
    const products = await this.products
      .query()
      .sort({ createdAt: 1 })
      .limit(10)
      .exec()

    return products.map<ProductDto>(p => {
      return {
        id: p._id,
        name: p.name,
        thumb: p.thumb,
        price: p.price,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt
      }
    })
  }

  async generateSampleData() {
    if ((await this.products.count()) > 0) {
      return
    }

    const products: Product[] = [
      {
        _id: '2b84dc03-efc4-434b-b854-6751925e0c46',
        name: 'Meldea Green Tea Liquor',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 744,
        createdAt: '2017-12-29 17:37:21',
        updatedAt: '2018-01-12 17:52:17'
      },
      {
        _id: 'ebd633f3-5456-48c4-acb0-6f47c92c85c0',
        name: 'Pork Salted Bellies',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 14224,
        createdAt: '2017-05-04 20:51:40',
        updatedAt: '2017-10-28 14:14:21'
      },
      {
        _id: '78d642cf-3f60-4ce5-8b3e-e1de6cc8aad2',
        name: 'Cranberries - Frozen',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 77714,
        createdAt: '2018-01-27 10:19:11',
        updatedAt: '2017-04-05 17:40:04'
      },
      {
        _id: '219e5ea1-416e-473e-8724-dbd7696b173b',
        name: 'Sugar - Brown',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 33919,
        createdAt: '2018-01-19 06:17:35',
        updatedAt: '2017-11-02 06:38:32'
      },
      {
        _id: '6d2a3a95-fd24-41b4-b1c9-bc7a1258782b',
        name: 'Chinese Foods - Pepper Beef',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 67798,
        createdAt: '2018-02-21 02:25:53',
        updatedAt: '2017-05-26 14:19:11'
      },
      {
        _id: '1092bfab-69d9-4179-ac3c-b90168820bcf',
        name: 'Rice - Wild',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 91717,
        createdAt: '2017-04-18 06:52:06',
        updatedAt: '2018-01-07 05:27:25'
      },
      {
        _id: '1f6732a2-0e7d-45b5-bd89-76cfec88cda4',
        name: 'Containter - 3oz Microwave Rect.',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 10368,
        createdAt: '2017-10-26 15:46:39',
        updatedAt: '2018-02-22 23:12:17'
      },
      {
        _id: 'a6cdceae-4672-435b-b1a7-b00be46dbc61',
        name: 'Onions - Red',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 66350,
        createdAt: '2017-12-05 10:42:56',
        updatedAt: '2017-11-28 11:23:04'
      },
      {
        _id: '6720f0bb-0689-46fb-9d53-640c40f4f882',
        name: 'Rum - Spiced, Captain Morgan',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 48792,
        createdAt: '2017-07-27 02:44:18',
        updatedAt: '2017-05-12 01:30:55'
      },
      {
        _id: '67d93f9e-5488-4a24-bdfd-24221c39afbd',
        name: 'Salmon - Canned',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 4135,
        createdAt: '2017-06-09 02:34:57',
        updatedAt: '2017-07-27 22:03:16'
      },
      {
        _id: '4c36d67c-1282-4229-a20b-d5d689121f33',
        name: 'Miso - Soy Bean Paste',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 27827,
        createdAt: '2017-05-13 13:47:00',
        updatedAt: '2017-04-06 01:28:51'
      },
      {
        _id: 'ff2c6533-b72a-4138-90a7-2fbf7cd69fc7',
        name: 'Soup Bowl Clear 8oz92008',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 54942,
        createdAt: '2017-10-13 22:36:43',
        updatedAt: '2017-09-09 16:51:37'
      },
      {
        _id: '78069d23-3c78-496a-aec1-47d5df9b8da4',
        name: 'Pork Loin Cutlets',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 77414,
        createdAt: '2017-05-16 09:14:37',
        updatedAt: '2017-11-04 06:49:33'
      },
      {
        _id: 'df84c66f-c327-459f-9488-120ba4754fd1',
        name: 'Trout - Hot Smkd, Dbl Fillet',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 87964,
        createdAt: '2017-07-24 13:11:51',
        updatedAt: '2017-11-02 06:32:09'
      },
      {
        _id: '78e5ba1a-46e4-4172-a06f-c8fc4bcc1911',
        name: 'Pomello',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 43195,
        createdAt: '2017-06-17 07:51:29',
        updatedAt: '2017-08-10 05:38:30'
      },
      {
        _id: 'f0ea543f-1848-493c-85ac-70f477d26cfa',
        name: 'Pastry - French Mini Assorted',
        thumb: 'http://dummyimage.com/128x128.bmp/cc0000/ffffff',
        price: 309,
        createdAt: '2017-06-07 00:34:19',
        updatedAt: '2018-03-06 08:10:46'
      },
      {
        _id: 'f0d61499-6610-4ebf-af6b-4a630e950943',
        name: 'Veal - Round, Eye Of',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 75121,
        createdAt: '2018-01-06 18:29:24',
        updatedAt: '2018-02-07 01:48:01'
      },
      {
        _id: '1d938210-5287-4db9-a5cc-a0d61215839a',
        name: 'Lobster - Tail 6 Oz',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 81661,
        createdAt: '2017-04-27 12:51:52',
        updatedAt: '2017-10-12 09:36:20'
      },
      {
        _id: '6af158dd-0e05-443d-8658-3e8bf33a38ff',
        name: 'Extract - Raspberry',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 98119,
        createdAt: '2017-06-07 19:40:45',
        updatedAt: '2017-06-27 09:49:43'
      },
      {
        _id: '2f44f45c-b175-4471-bf66-89af314ce61a',
        name: 'Cheese - Mix',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 7391,
        createdAt: '2017-08-12 01:29:54',
        updatedAt: '2018-02-17 05:11:52'
      },
      {
        _id: 'c45b2231-29ae-43f3-b980-8c6f45da1fdf',
        name: 'Hog / Sausage Casing - Pork',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 56205,
        createdAt: '2017-10-13 02:35:37',
        updatedAt: '2017-10-01 06:17:44'
      },
      {
        _id: '00c90f23-43f0-49bc-9821-b1155dff8e98',
        name: 'Chocolate - Dark Callets',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 6206,
        createdAt: '2017-08-25 04:46:59',
        updatedAt: '2017-10-14 06:30:22'
      },
      {
        _id: '8c7f2c36-9aa2-4f08-9c59-5bfa83acc458',
        name: 'Slt - Individual Portions',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 90743,
        createdAt: '2017-07-21 10:01:20',
        updatedAt: '2017-08-09 11:29:24'
      },
      {
        _id: '0d6e48d1-231f-438c-8b3d-db5f580cd8d9',
        name: 'Vinegar - Raspberry',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 81440,
        createdAt: '2017-04-29 10:03:21',
        updatedAt: '2017-11-06 23:53:31'
      },
      {
        _id: '7f034dd9-e1e3-46c3-84d2-e7546227389f',
        name: 'Tarragon - Fresh',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 60035,
        createdAt: '2017-04-25 01:28:28',
        updatedAt: '2017-08-23 10:55:21'
      },
      {
        _id: '08d22cad-8a82-4941-8d55-c69d0b9f2998',
        name: 'Cheese - Mix',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 22319,
        createdAt: '2017-06-05 08:05:54',
        updatedAt: '2018-01-23 09:26:20'
      },
      {
        _id: 'bfaebcb5-5fda-4ef6-94a6-0915eeb1bf33',
        name: 'Wine - Duboeuf Beaujolais',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 24623,
        createdAt: '2018-03-11 22:52:26',
        updatedAt: '2017-04-10 09:51:01'
      },
      {
        _id: 'df15bddc-5f09-419e-adce-e131ea869433',
        name: 'Carrots - Jumbo',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 52468,
        createdAt: '2017-11-19 22:34:21',
        updatedAt: '2017-05-11 07:59:07'
      },
      {
        _id: 'ba3eb65d-98d1-42c7-bb43-5774f2e9c372',
        name: 'Bamboo Shoots - Sliced',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 36235,
        createdAt: '2017-09-17 02:03:28',
        updatedAt: '2017-06-04 11:15:51'
      },
      {
        _id: '0064b0f2-b428-4b32-810f-e0a8d044c234',
        name: 'Chutney Sauce - Mango',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 48440,
        createdAt: '2018-01-28 10:58:14',
        updatedAt: '2018-03-02 04:34:18'
      },
      {
        _id: '3c990d8f-141f-4f59-8bd1-24750c99a1fd',
        name: 'Tomato - Tricolor Cherry',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 28359,
        createdAt: '2017-10-15 22:06:26',
        updatedAt: '2017-09-14 06:46:53'
      },
      {
        _id: 'df13af11-c26b-4c8a-8ca9-4a08dc82f5c0',
        name: 'Vermouth - White, Cinzano',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 30935,
        createdAt: '2017-12-19 12:35:34',
        updatedAt: '2017-12-03 00:41:39'
      },
      {
        _id: '9391b94a-f379-4a31-a831-55f879267dd4',
        name: 'Madeira',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 34985,
        createdAt: '2017-09-06 10:00:44',
        updatedAt: '2018-02-21 00:45:29'
      },
      {
        _id: '718fd8a7-e8fe-4a16-a196-abba30c14d8e',
        name: 'Tomatoes - Diced, Canned',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 33670,
        createdAt: '2017-11-05 12:44:20',
        updatedAt: '2017-09-06 22:10:53'
      },
      {
        _id: '8da4ba72-929e-48d2-b887-1a5b1136654e',
        name: 'Wine - White, Riesling, Henry Of',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 6049,
        createdAt: '2017-08-04 14:03:38',
        updatedAt: '2017-06-17 19:45:58'
      },
      {
        _id: 'e5fa021b-3c6e-4cf1-8043-b59626db0305',
        name: 'Soup - Chicken And Wild Rice',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 93213,
        createdAt: '2018-01-24 01:07:28',
        updatedAt: '2017-06-02 19:42:00'
      },
      {
        _id: 'c347ba78-5772-40d6-9000-5ef458aa6e55',
        name: 'Wine - White, Antinore Orvieto',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 24438,
        createdAt: '2017-12-10 16:04:28',
        updatedAt: '2017-07-16 12:37:41'
      },
      {
        _id: 'fbd47957-0221-4155-9aa7-efd522956b0a',
        name: 'Scallop - St. Jaques',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 63636,
        createdAt: '2018-02-12 12:58:13',
        updatedAt: '2018-02-05 04:47:24'
      },
      {
        _id: '5e63a080-f60e-47e2-90ca-e051e4150450',
        name: 'Lime Cordial - Roses',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 1266,
        createdAt: '2018-01-17 03:43:22',
        updatedAt: '2018-03-17 03:30:25'
      },
      {
        _id: 'de6ffd7e-7f9e-475d-997d-56e9001cbd1f',
        name: 'Cake Circle, Foil, Scallop',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 85316,
        createdAt: '2017-07-06 07:30:29',
        updatedAt: '2017-07-31 23:16:10'
      },
      {
        _id: '76def213-51f4-4002-b124-bd7b61a366ec',
        name: 'Kippers - Smoked',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 91432,
        createdAt: '2018-03-12 13:17:31',
        updatedAt: '2017-07-01 07:22:22'
      },
      {
        _id: 'c3b64b57-454b-4cd3-8c9f-dca559258432',
        name: 'Coffee - Irish Cream',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 71394,
        createdAt: '2017-04-08 11:35:35',
        updatedAt: '2017-04-26 07:24:03'
      },
      {
        _id: '17f4a7ac-f245-46e8-b5f0-62d525885edd',
        name: 'Wine - White, Chardonnay',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 25098,
        createdAt: '2017-08-05 21:29:13',
        updatedAt: '2017-05-31 15:34:38'
      },
      {
        _id: '53a5b050-c79e-4d45-b72a-f867cdd46b07',
        name: 'Wine - Taylors Reserve',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 25107,
        createdAt: '2017-07-31 11:24:45',
        updatedAt: '2017-09-11 06:05:02'
      },
      {
        _id: '3cc4e37d-d459-4bd6-92ff-d29b58bd4ee6',
        name: 'Campari',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 85247,
        createdAt: '2017-08-14 18:08:29',
        updatedAt: '2017-07-26 13:03:33'
      },
      {
        _id: '782b2ee2-f2c4-481c-b6ef-392296ecbb3f',
        name: 'Beef - Baby, Liver',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 21592,
        createdAt: '2017-11-21 13:04:05',
        updatedAt: '2017-11-07 09:20:01'
      },
      {
        _id: '17199f1c-2d01-44ed-a7e4-a5f4641a20d2',
        name: 'Swiss Chard',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 72755,
        createdAt: '2017-06-24 09:56:23',
        updatedAt: '2017-11-03 07:25:20'
      },
      {
        _id: '5672eb13-3c1f-42b9-8e07-499b917f0c9e',
        name: 'Mushroom - Chantrelle, Fresh',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 72370,
        createdAt: '2017-09-04 19:24:39',
        updatedAt: '2018-02-24 23:54:11'
      },
      {
        _id: '44a39fb0-76cc-4b96-b57e-39710cb14319',
        name: 'Smirnoff Green Apple Twist',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 19261,
        createdAt: '2017-11-04 05:05:44',
        updatedAt: '2017-04-04 20:03:49'
      },
      {
        _id: 'df0c39db-0871-4775-b67e-c32b4ae4a1e9',
        name: 'Pork - Smoked Kassler',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 92685,
        createdAt: '2017-06-09 15:55:57',
        updatedAt: '2017-12-29 20:21:25'
      },
      {
        _id: '1ffd4186-21f6-4511-b2ee-9c487ee702a3',
        name: 'Basil - Fresh',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 77095,
        createdAt: '2017-09-08 07:57:53',
        updatedAt: '2017-07-09 13:18:22'
      },
      {
        _id: '14fa5d20-1f42-4059-9774-f8184c7afdc4',
        name: 'Food Colouring - Blue',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 5444,
        createdAt: '2017-10-24 08:42:10',
        updatedAt: '2017-04-06 14:42:50'
      },
      {
        _id: 'd5f02060-e3c3-449a-98e7-9230eec4fe98',
        name: 'Veal - Slab Bacon',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 84775,
        createdAt: '2017-08-03 13:41:13',
        updatedAt: '2017-08-19 18:53:06'
      },
      {
        _id: '7fd82d5d-b2a4-413a-9f88-4f884877dc21',
        name: 'Wine - Red, Cabernet Merlot',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 22927,
        createdAt: '2017-09-28 05:11:50',
        updatedAt: '2017-10-25 11:37:33'
      },
      {
        _id: '1529c549-82b1-413c-b2de-3f0d261ff86d',
        name: 'Pineapple - Golden',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 46768,
        createdAt: '2018-01-19 18:42:49',
        updatedAt: '2018-02-02 23:05:54'
      },
      {
        _id: '84e937f8-4911-4f55-883f-c831c5d35c7a',
        name: 'Flower - Daisies',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 12250,
        createdAt: '2017-09-05 18:49:10',
        updatedAt: '2017-06-13 07:31:59'
      },
      {
        _id: '15436075-854d-455b-b361-fe1d2db30d6a',
        name: 'Beef - Sushi Flat Iron Steak',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 95415,
        createdAt: '2017-12-14 09:10:40',
        updatedAt: '2017-12-19 23:04:16'
      },
      {
        _id: '4d94acca-f578-4a88-8e37-1ce6037ea04a',
        name: 'Cheese - Brie',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 85429,
        createdAt: '2017-05-18 13:19:43',
        updatedAt: '2017-05-14 03:54:49'
      },
      {
        _id: '6975ae1d-90ca-4f51-a81f-d4fc9cbd0bec',
        name: 'Sole - Fillet',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 1525,
        createdAt: '2017-05-31 12:52:54',
        updatedAt: '2017-10-24 02:32:25'
      },
      {
        _id: 'ca2f1721-6640-4c3a-b5c5-f8b1fdd4844c',
        name: 'Wine - Cahors Ac 2000, Clos',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 89865,
        createdAt: '2017-10-20 18:11:31',
        updatedAt: '2018-03-20 04:53:11'
      },
      {
        _id: 'f5c6e292-48fd-43a7-bb7b-3f6d20b1733d',
        name: 'Cookies Oatmeal Raisin',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 49670,
        createdAt: '2017-11-03 15:04:43',
        updatedAt: '2017-07-11 16:31:15'
      },
      {
        _id: '27f55e72-8726-4adb-a728-eae28d219871',
        name: 'Wine - Cotes Du Rhone Parallele',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 20711,
        createdAt: '2017-04-24 11:45:07',
        updatedAt: '2018-02-05 20:08:23'
      },
      {
        _id: '74d6f8f3-6bfb-42bd-9f54-5e80196d6b0a',
        name: 'Taro Leaves',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 64233,
        createdAt: '2018-02-19 00:50:58',
        updatedAt: '2017-09-04 03:45:36'
      },
      {
        _id: '915aa958-e4d8-4bef-a864-3135b1059da6',
        name: 'Cheese - Victor Et Berthold',
        thumb: 'http://dummyimage.com/128x128.bmp/cc0000/ffffff',
        price: 87002,
        createdAt: '2017-04-25 18:13:54',
        updatedAt: '2017-06-23 12:00:20'
      },
      {
        _id: 'ed971adf-a7c6-48cd-a2de-8562f5c29983',
        name: 'Chicken - Breast, 5 - 7 Oz',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 97720,
        createdAt: '2017-12-03 22:00:41',
        updatedAt: '2017-11-05 01:05:16'
      },
      {
        _id: '9eedc180-6d4b-4090-bceb-93f34a3d7eee',
        name: 'Ostrich - Fan Fillet',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 19117,
        createdAt: '2018-02-02 01:21:34',
        updatedAt: '2017-06-02 06:34:12'
      },
      {
        _id: 'f35618f7-5aad-4281-99db-7769e861920e',
        name: 'Wine - Delicato Merlot',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 90924,
        createdAt: '2017-10-30 21:42:25',
        updatedAt: '2017-12-13 22:45:37'
      },
      {
        _id: 'e1829125-7921-4bb1-a451-d5c3bc1fa4a8',
        name: 'Cleaner - Lime Away',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff',
        price: 78362,
        createdAt: '2017-05-11 09:18:55',
        updatedAt: '2017-08-19 10:26:33'
      },
      {
        _id: 'cca428dd-aea8-40f9-a2af-79c32812ff0e',
        name: 'Lid - Translucent, 3.5 And 6 Oz',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 84166,
        createdAt: '2017-10-11 11:57:44',
        updatedAt: '2017-06-26 08:43:32'
      },
      {
        _id: '6c8273e4-2d13-427a-bd4c-025af80043c6',
        name: 'Zucchini - Yellow',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000',
        price: 93893,
        createdAt: '2017-08-25 07:33:25',
        updatedAt: '2017-10-29 09:36:39'
      },
      {
        _id: 'cc453ee1-bc3d-4328-9399-bdab2bd3a28c',
        name: 'Gherkin',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 30787,
        createdAt: '2017-04-18 14:24:43',
        updatedAt: '2017-05-27 06:14:47'
      },
      {
        _id: '4385fc23-640e-4b48-a95e-173fe6dce465',
        name: 'Jack Daniels',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000',
        price: 6712,
        createdAt: '2017-08-14 09:20:57',
        updatedAt: '2018-02-07 04:41:53'
      },
      {
        _id: '2b47f6a5-afc5-4498-823a-53d24b6f5de9',
        name: 'Beef Tenderloin Aaa',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 54021,
        createdAt: '2017-10-08 08:54:37',
        updatedAt: '2017-09-14 10:20:04'
      },
      {
        _id: 'a1eb590d-7b0c-43be-a96e-c0fe6fc89e54',
        name: 'Mangostein',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 50442,
        createdAt: '2017-03-26 14:09:55',
        updatedAt: '2018-02-19 18:37:52'
      },
      {
        _id: '89745775-624e-469a-956a-5981fc53c7df',
        name: 'Coffee Swiss Choc Almond',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 18626,
        createdAt: '2017-07-15 03:01:17',
        updatedAt: '2017-09-14 12:42:34'
      },
      {
        _id: '08dcae91-11b1-40da-8538-9dd709916c39',
        name: 'Gatorade - Orange',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 88630,
        createdAt: '2017-06-09 05:15:31',
        updatedAt: '2017-05-08 13:28:22'
      },
      {
        _id: 'd655f863-2996-48af-a5d0-f3198fdf5ec0',
        name: 'Squid - U - 10 Thailand',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 59212,
        createdAt: '2017-08-24 10:04:37',
        updatedAt: '2018-02-16 10:03:29'
      },
      {
        _id: 'a89c795c-73c5-43fb-9c8b-662c8997f508',
        name: 'Appetizer - Assorted Box',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 78534,
        createdAt: '2017-04-18 16:11:59',
        updatedAt: '2017-12-02 08:06:32'
      },
      {
        _id: '07c45a34-0e6e-440a-b9fd-aef89e14c8f1',
        name: 'Beets - Golden',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 95004,
        createdAt: '2018-02-01 12:06:34',
        updatedAt: '2017-04-10 15:26:22'
      },
      {
        _id: 'a12ece0f-eec5-47b0-8f43-60bf30446b10',
        name: 'Muskox - French Rack',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 27886,
        createdAt: '2017-09-08 19:09:54',
        updatedAt: '2017-09-23 12:44:11'
      },
      {
        _id: '8a1ee6d5-48db-4913-a817-9131894ca113',
        name: 'Cheese - Brick With Pepper',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 22444,
        createdAt: '2017-06-22 01:59:15',
        updatedAt: '2017-06-22 01:01:48'
      },
      {
        _id: '24088590-029d-46b9-bf36-c8f55140257e',
        name: 'Cheese - Gouda',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 85052,
        createdAt: '2018-02-07 12:17:10',
        updatedAt: '2018-02-05 19:22:13'
      },
      {
        _id: '42face10-f0bd-4b25-955c-f9f6fa94f152',
        name: 'Lettuce - Escarole',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 54186,
        createdAt: '2018-01-19 03:12:34',
        updatedAt: '2017-06-05 11:26:59'
      },
      {
        _id: 'e6f2620b-298a-42e6-b68a-ed78b48ece83',
        name: 'Pasta - Penne Primavera, Single',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 79496,
        createdAt: '2017-04-06 00:56:32',
        updatedAt: '2018-02-13 00:48:14'
      },
      {
        _id: 'd6ba6689-e9c8-40c9-8dde-0955d109eec4',
        name: 'Wine - Peller Estates Late',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 85945,
        createdAt: '2018-02-13 12:16:05',
        updatedAt: '2017-09-21 19:51:17'
      },
      {
        _id: '0656dbbc-7ec6-4e54-b318-b0c68df566ac',
        name: 'Wine - White Cab Sauv.on',
        thumb: 'http://dummyimage.com/128x128.jpg/dddddd/000000',
        price: 80758,
        createdAt: '2017-12-16 12:42:03',
        updatedAt: '2017-09-07 19:31:34'
      },
      {
        _id: '791ec1fb-8df8-4231-9c96-23865669a397',
        name: 'Beer - Tetleys',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 50612,
        createdAt: '2017-09-03 17:35:02',
        updatedAt: '2017-08-21 04:02:22'
      },
      {
        _id: '5565ecc3-16b4-495e-971c-f82aaa90e39a',
        name: 'Tortillas - Flour, 10',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 75605,
        createdAt: '2017-07-03 17:49:34',
        updatedAt: '2017-08-02 01:32:03'
      },
      {
        _id: 'b59cc1ce-0992-448a-87e8-1299170ec193',
        name: 'Wine - Red Oakridge Merlot',
        thumb: 'http://dummyimage.com/128x128.bmp/cc0000/ffffff',
        price: 95937,
        createdAt: '2017-07-31 19:13:16',
        updatedAt: '2017-07-14 18:23:26'
      },
      {
        _id: 'd599a781-d901-4310-a726-98821d78e28a',
        name: 'Pepsi, 355 Ml',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 46423,
        createdAt: '2017-04-16 07:37:08',
        updatedAt: '2017-06-15 08:33:54'
      },
      {
        _id: '88b8944b-8180-485c-8253-7499ced6e210',
        name: 'Ginger - Pickled',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 80477,
        createdAt: '2017-05-23 11:08:25',
        updatedAt: '2017-07-30 22:15:27'
      },
      {
        _id: '6e6c55f2-a916-4f70-8b0f-41ae9c14e76e',
        name: 'Soup - Campbells, Classic Chix',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000',
        price: 95301,
        createdAt: '2017-07-16 17:32:34',
        updatedAt: '2017-12-20 06:14:40'
      },
      {
        _id: '6263cdd5-2a5c-446a-87d0-7c9b84142271',
        name: 'Veal - Osso Bucco',
        thumb: 'http://dummyimage.com/128x128.jpg/ff4444/ffffff',
        price: 91450,
        createdAt: '2017-12-09 06:55:36',
        updatedAt: '2018-01-14 15:31:21'
      },
      {
        _id: 'd03f19e6-da83-4dc4-877b-ce13f553127a',
        name: 'Wild Boar - Tenderloin',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff',
        price: 56726,
        createdAt: '2017-12-22 22:42:54',
        updatedAt: '2017-10-18 12:32:14'
      },
      {
        _id: '2f53c59e-8901-4842-9f0f-7c4264bc891a',
        name: 'Salmon - Whole, 4 - 6 Pounds',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff',
        price: 87317,
        createdAt: '2018-02-01 10:14:34',
        updatedAt: '2017-06-19 12:59:46'
      },
      {
        _id: 'f41bafe4-691d-4597-8bf5-e9c0ba4e0925',
        name: 'Cake - Bande Of Fruit',
        thumb: 'http://dummyimage.com/128x128.jpg/5fa2dd/ffffff',
        price: 81467,
        createdAt: '2017-11-03 11:59:31',
        updatedAt: '2017-12-05 22:54:49'
      },
      {
        _id: 'ff1ad54e-14fa-4eed-8394-601c3619e982',
        name: 'Pie Shell - 9',
        thumb: 'http://dummyimage.com/128x128.bmp/5fa2dd/ffffff',
        price: 24652,
        createdAt: '2017-09-04 08:41:18',
        updatedAt: '2018-03-19 21:55:04'
      },
      {
        _id: 'fb846432-ee6e-499c-b1dd-df4469e5d309',
        name: 'Banana Turning',
        thumb: 'http://dummyimage.com/128x128.bmp/dddddd/000000',
        price: 39929,
        createdAt: '2017-07-13 19:33:46',
        updatedAt: '2017-06-06 23:38:46'
      },
      {
        _id: '25783d48-7394-485e-909d-2e04a30e6cd3',
        name: 'Wine - Magnotta - Cab Sauv',
        thumb: 'http://dummyimage.com/128x128.jpg/cc0000/ffffff',
        price: 74688,
        createdAt: '2017-07-22 23:25:20',
        updatedAt: '2017-05-21 17:35:18'
      },
      {
        _id: 'e4ea2e4e-656a-4ced-8084-6a513d1ed203',
        name: 'Lettuce - Baby Salad Greens',
        thumb: 'http://dummyimage.com/128x128.bmp/ff4444/ffffff',
        price: 42452,
        createdAt: '2017-12-22 07:49:20',
        updatedAt: '2017-10-02 21:18:41'
      }
    ]

    await this.products.insertMany(products)
  }
}
