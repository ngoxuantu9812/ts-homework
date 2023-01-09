// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view, initialize, LookupMap, UnorderedMap } from 'near-sdk-js';
import { AccountId } from 'near-sdk-js/lib/types';

class Token {
  token_id: number;
  account_id: AccountId;
  owner_id: string;
  msg: string;
  approved_account_ids:  {
    [approved_account_id: AccountId]: bigint;
  };
  constructor(token_id: number, account_id: AccountId, msg: string) {
    this.token_id = token_id,
    this.account_id = account_id,
    this.owner_id = 'alice.near',
    this.msg = msg
  }
}

@NearBindgen({})
class Nft {
  token_id: number;
  account_id: AccountId;
  token_by_id: LookupMap<any>;
  constructor() {
    this.token_id = 0
    this.account_id = "";
    this.token_by_id = new LookupMap("t");
  }

  @initialize({})
  init({ token_id, account_id }: {token_id:string, account_id: AccountId}) {
    this.token_id = Number(token_id);
    this.account_id = account_id;
    this.token_by_id = new LookupMap("t");
  }
  @call({})
  nft_approve({token_id , account_id, msg }: {token_id:string, account_id: string, msg: string }) {
    let token = new Token(Number(token_id), account_id, msg);
    this.token_by_id.set(token_id.toString(), token);
    return token;
  }

  @view({})
  nft_token({ token_id }: { token_id: string }) {
    let token = this.token_by_id.get(token_id);
    if (token == null) {
      return null;
    }
    return token;
  }

  @view({})
  get_all_tokens({ start, max }: { start?: number, max?: number }) {
    var all_tokens = [];
    for (let i = 0; i < this.token_id; i++) {
      all_tokens.push(this.token_by_id.get(i.toString()));
    }

    return all_tokens;
  }
  @view({})
  nft_is_approved(token_id: string, approved_account_id: string) {
    let token = this.token_by_id.get(token_id);
    return token;
    if (token.account_id == approved_account_id) {
      return true;
    }
    return false;
  }


}