import { GraphQLNonNull, GraphQLString } from 'graphql'
import { CreateBankDto } from '../../../views/dto/payment/bank';
import { BankService } from '../../services/bank';

export const addBank: GqlFieldConfig<CreateBankDto> = {
  type: GraphQLString,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve: async (source, args, ctx) => {
    return ctx.service(BankService).add(args)
  }
}
