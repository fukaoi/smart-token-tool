import { PhantomMetaplex } from '@solana-suite/phantom';
import { ValidatorError } from '@solana-suite/shared-metaplex';

export const addPublicKey = (creators: any) => {
  const res = creators.map(
    (item: { address: string; share: number; verified: boolean }) => {
      const address = item.address.toPublicKey();
      return {
        address,
        share: item.share,
        verified: item.verified,
      };
    },
  );
  return res;
};

export const creatorMint = async (
  filePath: ArrayBuffer,
  name: string,
  symbol: string,
  description: string,
  royalty: number,
  cluster: string,
  creators?: any,
) => {
  const mint = await PhantomMetaplex.mint(
    {
      filePath,
      name,
      symbol,
      description,
      royalty,
      creators,
      storageType: 'nftStorage',
    },
    cluster,
    window.solana,
  );

  mint.match(
    (ok: any) => {
      console.debug('mint: ', ok);
    },
    (err: Error) => {
      console.error('err:', err);
      if ('details' in err) {
        console.error((err as ValidatorError).details);
      }
    },
  );

  return mint.unwrap();
};
