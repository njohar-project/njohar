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
        thumb: p.thumb
      }
    })
  }

  async generateSampleData() {
    if ((await this.products.count()) > 0) {
      return
    }

    const products: Product[] = [
      {
        _id: '6ec009c9-087b-498f-9186-f2991a722355',
        name: 'Beer - Camerons Cream Ale',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '5af11f21-05b8-4e5f-b41e-d2057b5fa639',
        name: 'Sauce - Thousand Island',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '4f7643b6-86cd-4bd6-a9a5-80737799c1bc',
        name: 'Carbonated Water - Orange',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '3dcefef0-732d-4817-a891-ae2c3b0e9593',
        name: 'Cheese - Victor Et Berthold',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'ee91800e-93d3-4cd7-bd66-ec788cb35140',
        name: 'Kohlrabi',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '9f512c9d-2bb5-4c3d-b5e0-85ceb816261d',
        name: 'Flower - Commercial Spider',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'c83df1ff-9816-4cd0-9e3d-a3319ad4ca80',
        name: 'Pork - European Side Bacon',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '1ea24733-f3e3-4e09-8e00-365aae357224',
        name: 'Muffin Mix - Blueberry',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'a456decd-a874-41d4-902b-4752c5209368',
        name: 'Ginger - Ground',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'cf22b4f9-0647-4fa7-917f-6afbac6235f5',
        name: 'Venison - Liver',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '0bbaaaa5-f918-4e5c-8b41-ddc821ecdf60',
        name: 'Iced Tea Concentrate',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '28734fe6-72be-4365-ab9c-670d15f92f76',
        name: 'Wine - Alicanca Vinho Verde',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '5e61bac5-5d00-417a-9691-e5bf31df272a',
        name: 'Coconut - Whole',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '6551c6fc-befa-4748-8404-67afb46c4d02',
        name: 'Oil - Shortening - All - Purpose',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '25a26f4a-035c-46e8-ae9e-59a71001e903',
        name: 'Beef - Top Sirloin',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'b9436bb8-41cb-4821-9bbd-ca03f37641d0',
        name: 'Snails - Large Canned',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '3fa16b3e-7032-4bd6-8473-010c5b4ce6cd',
        name: 'Soup - Knorr, Classic Can. Chili',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'cbdf22d3-bd68-47ba-8c53-f6b5b906efcd',
        name: 'Lid Coffee Cup 8oz Blk',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '43adbede-36f9-48fa-92b1-db7a84af1dc8',
        name: 'Calypso - Lemonade',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '47a414a5-6fc3-4b74-bced-1becaec57746',
        name: 'Beans - Kidney, Canned',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'f8192cc8-c861-4899-aea0-933e4c9e9f2c',
        name: 'The Pop Shoppe - Root Beer',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'b302028d-21e8-4dd1-b02b-4ab1fbef4226',
        name: 'Pecan Raisin - Tarts',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '224f48aa-93b0-4d40-b90b-4a6dea68c657',
        name: 'Garbage Bags - Black',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '3bcde045-a2dc-451a-a46f-58eedee29077',
        name: 'Figs',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '7a0c6bea-6375-478a-a1a7-f0c43d57fc48',
        name: 'Lemonade - Island Tea, 591 Ml',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '263ddd6d-a639-400a-979a-07ffa798beeb',
        name: 'Cranberry Foccacia',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'fbc7e2e0-8f24-47ea-bd7c-9738366fc67d',
        name: 'Magnotta Bel Paese Red',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '8a868f94-2eb3-4c30-ad2e-b80c2ef1ebd0',
        name: 'Vinegar - Raspberry',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'b5174ff7-c143-4152-b117-a98aac228b56',
        name: 'Vinegar - Rice',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'dd0213c9-b9d0-49a9-9d95-f0d7b9563cde',
        name: 'Tray - 16in Rnd Blk',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '1d3b9843-3bf6-4632-92ec-638ad6be7e1e',
        name: 'Wine - Vidal Icewine Magnotta',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '86ee87e4-c229-4fb7-945b-2677bd36216d',
        name: 'Kaffir Lime Leaves',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'aefa5a5f-cfa7-4109-a0dc-22c43666da5d',
        name: 'Wine - Barossa Valley Estate',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'c7ad0a16-0fe5-43c4-ac90-aa986a88fa50',
        name: 'Cheese - Parmesan Cubes',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'a7b9e1a3-57d0-408e-a7b9-b9fb80a50c38',
        name: 'Cheese - Brick With Pepper',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '8d84732d-024c-4c45-a528-5abbc3a6a369',
        name: 'Appetiser - Bought',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'bfd6ff82-7b0f-4a17-b88c-ad83e08b667f',
        name: 'Hog / Sausage Casing - Pork',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '9857d6e6-9d28-412f-973f-7953c9c24560',
        name: 'Prunes - Pitted',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '16fff252-ce25-449c-96be-125c9f620c54',
        name: 'Bread - Crusty Italian Poly',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'a431c8af-9780-4502-9ce0-ffba4fbbd38d',
        name: 'Soup Campbells - Italian Wedding',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '2e25952d-4f58-4667-a7e2-c89ba15230b9',
        name: 'Ecolab - Hand Soap Form Antibac',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'df1f8da3-3285-479e-835e-627312078e46',
        name: 'Turkey Tenderloin Frozen',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'd6343201-6540-445e-92e7-6b49595a4e04',
        name: 'Muffin Hinge Container 6',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'eaf15d86-47a2-4718-ac58-d98019d49cc8',
        name: 'Ice Cream - Fudge Bars',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '7b94cad8-d9aa-4624-8ad0-d8154e962630',
        name: 'Pepper - Red Bell',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '3c62b384-0636-4c63-be5b-744cd8177e75',
        name: 'Soup - French Onion',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'ff7c660a-a8b7-4c4f-8b29-47ff6f22fca6',
        name: 'Flour - Cake',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '7d236254-2e42-420a-a36f-e17b17a0c815',
        name: 'Beef - Ox Tongue',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'eacdc4fe-60f3-4855-8199-27cf20647539',
        name: 'Jolt Cola - Electric Blue',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '549c6ebc-7ea7-47b8-ac5d-37eef2e48296',
        name: 'Syrup - Monin - Passion Fruit',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '6de261ec-195b-449c-82be-fbc04e0ef76c',
        name: 'Beef - Chuck, Boneless',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'f4571a2b-2f3e-457e-a754-6d6a855281eb',
        name: 'Cheese - Mascarpone',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '85d39651-006e-45f0-ae4d-71c0e279037f',
        name: 'Lettuce - Lambs Mash',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '40acfc14-e76a-4b90-a240-a75a63944f44',
        name: 'Pasta - Tortellini, Fresh',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '80cbe63b-4fb5-4ef6-8b33-e7388a6f87b2',
        name: 'Soupcontfoam16oz 116con',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '004a68e0-ef9e-4d6b-8955-872493d3ff48',
        name: 'Bananas',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '5b35331e-a277-4e0d-94fa-526606959ced',
        name: 'Oxtail - Cut',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '6c87db7e-f301-4b55-b842-d119150bc2c0',
        name: 'Pork - Ham, Virginia',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'c04c0cd1-8fed-4e67-8a5b-c8c9cbbf4efd',
        name: 'Cranberries - Fresh',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '0cfa8f58-2475-4949-a227-4cf8a3683834',
        name: 'Lid Coffee Cup 8oz Blk',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'bdc7c595-6e31-4cab-98b0-404a8899921d',
        name: 'Wine - Red, Mosaic Zweigelt',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '121afbdb-c604-4413-abe9-1a5d095ecb44',
        name: 'Bread - Italian Roll With Herbs',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: 'a42f0284-d88b-4aad-8e7d-cceb596012af',
        name: 'Pail With Metal Handle 16l White',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '9fd15019-704d-461c-8a48-5f74d236713c',
        name: 'Cheese - Shred Cheddar / Mozza',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '0366a1a9-af6e-4d48-ad60-22952c66268e',
        name: 'Crab - Claws, Snow 16 - 24',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '000c8a8d-bec4-4f5d-b48b-a4f2e347a637',
        name: 'Bacardi Breezer - Tropical',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '662ce653-b324-4a76-9b9c-2be03081732d',
        name: 'Soup - Campbells Asian Noodle',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'f5c233f3-0b53-45e9-b32b-284d98eed7e6',
        name: 'Turkey - Oven Roast Breast',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '9ecf5551-ad94-4e29-b65d-3746746fc585',
        name: 'Potatoes - Mini Red',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '8d0045ad-b458-465e-b7c1-93b6000334da',
        name: 'Chips - Assorted',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '534b3325-f7f8-42de-abd4-a2e1f5816bc4',
        name: 'Anisette - Mcguiness',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '9610734c-b823-4c53-a1a5-4234fe05f5ef',
        name: 'Vaccum Bag 10x13',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '9943c8b4-fb6a-452f-993d-7def66297102',
        name: 'Curry Powder',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'ffa29a92-a0a5-47df-aefb-40a7ecd97bff',
        name: 'Wine - White, Schroder And Schyl',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'a2d5a997-22bb-4a84-bab1-073b5ac69513',
        name: 'Wine - Beringer Founders Estate',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'cac463e4-dc99-4e90-b0d3-b30278cde90d',
        name: 'Celery Root',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '51efc439-0d49-4bfd-95a6-9c6177e57e71',
        name: 'Kolrabi',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'ae8077ea-9f66-47af-a739-37a0aabfe521',
        name: 'Turkey - Breast, Smoked',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'ac6d5a34-4b55-42f7-ba1e-e6d488bdf0b4',
        name: 'Pasta - Linguini, Dry',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '70a9a95d-b5d0-48bf-8295-5a01d96ecf37',
        name: 'Onion - Dried',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'e3028ab8-30bb-40a4-8a8f-9058fce5f513',
        name: 'Pork - Ham Hocks - Smoked',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '6556546d-4f0e-42f9-9340-2ecd78059d82',
        name: 'Pasta - Linguini, Dry',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: 'd2137889-4de9-4672-ae8a-2f882b8b80f6',
        name: 'Tomatoes - Heirloom',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '9810b2d8-d638-45ca-8e62-bd1bb4c9b098',
        name: 'Coffee Guatemala Dark',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '5cb81243-50b7-47b8-9bad-f463b8f11665',
        name: 'Muffin Mix - Chocolate Chip',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '2158e9bc-7556-4002-91ab-cad329070937',
        name: 'Carrots - Jumbo',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'b0647b5c-c172-418b-8803-13b29c872048',
        name: 'Sambuca - Opal Nera',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '409b587c-1a61-426d-bcdd-d3a473e23d40',
        name: 'Ham - Cooked Italian',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '6813009a-e248-4d37-bff1-2e3cb034fc3f',
        name: 'Water - Mineral, Natural',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'f47fb90f-00b0-4f1d-bf97-1ff7bcb45783',
        name: 'Table Cloth 72x144 White',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '8ae55cdb-ca07-43f7-a830-062bd2b58fd0',
        name: 'Cake - Sheet Strawberry',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '4c66e68b-38d4-4536-adb7-2948ecf0dec9',
        name: 'Chevere Logs',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '56619402-42da-4873-862f-234704ec6337',
        name: 'Longos - Lasagna Veg',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: 'c556bef9-9bc8-4b90-afe4-c78ec5174e5d',
        name: 'Beef - Tenderlion, Center Cut',
        thumb: 'http://dummyimage.com/128x128.png/dddddd/000000'
      },
      {
        _id: '3681bbec-f472-4874-85b7-d5d3935e3beb',
        name: 'Mackerel Whole Fresh',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: '212f1952-5271-42b8-a84c-4ae6f933280e',
        name: 'Oil - Sesame',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'b1e4ee33-f50e-45e5-bd2d-cd1714794ece',
        name: 'Glycerine',
        thumb: 'http://dummyimage.com/128x128.png/ff4444/ffffff'
      },
      {
        _id: '1f39a3fc-e4c8-43a2-b703-85d36a2b376c',
        name: 'Hand Towel',
        thumb: 'http://dummyimage.com/128x128.png/5fa2dd/ffffff'
      },
      {
        _id: 'dcc8369e-40c0-4f02-a7a0-32580c223c49',
        name: 'Icecream - Dstk Super Cone',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      },
      {
        _id: '92fa125c-2e12-4bb3-b434-1a617baec54f',
        name: 'Carbonated Water - Blackberry',
        thumb: 'http://dummyimage.com/128x128.png/cc0000/ffffff'
      }
    ]

    await this.products.insertMany(products)
  }
}
