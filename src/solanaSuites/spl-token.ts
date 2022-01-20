import {
  MINT_SIZE,
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token';

import {
  Transaction,
  SystemProgram,
  PublicKey,
  Keypair,
  Connection,
} from '@solana/web3.js';

namespace Node {
  let connection: Connection;
  
  export const getConnection = () => {
    if (connection) return connection;
    connection = new Connection('http://api.devnet.solana.co');
    return connection;
  }
}

export namespace SplToken {
  export const createMint = async (
    owner: PublicKey,
    mintDecimal: number,
    signTransaction: (tx: Transaction) => any
    // ): Promise<Result<Instruction, Error>> => {
  ) => {
    const connection = Node.getConnection();
    const keypair = Keypair.generate();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: owner, 
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),

      createInitializeMintInstruction(
        keypair.publicKey, 
        mintDecimal, 
        keypair.publicKey, 
        keypair.publicKey, 
        TOKEN_PROGRAM_ID
      )
    );

    const signed = await signTransaction(transaction);
    const sig = await connection.sendRawTransaction(signed.serialize());
    console.log(sig);
    return keypair.publicKey;
  }
}