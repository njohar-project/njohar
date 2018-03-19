import { Context } from 'koa'
import { CreateBankDto } from '../../views/dto/payment/bank';
import { BankModel } from '../dataAccess'
import { Repository } from '../repository'

export class BankService {
  ctx: Context
  banks = new Repository(BankModel)

  constructor(ctx: Context) {
    this.ctx = ctx
  }
  async add(request: CreateBankDto): Promise<string> {
    const bank = await this.banks.create({
      name: request.name
    })
    return bank._id
  }
}