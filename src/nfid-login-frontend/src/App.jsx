import React, { useEffect, useState } from 'react';
import { NFID } from "@nfid/embed";
import { Principal } from '@dfinity/principal';

const App = () => {
  const [nfid, setNfid] = useState(null);
  const [delegation, setDelegation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initNFID = async () => {
      try {
        const nfIDInstance = await NFID.init({
          application: {
            name: "NFID Login",
            logo: "https://dev.nfid.one/static/media/id.300eb72f3335b50f5653a7d6ad5467b3.svg"
          },
        });
        setNfid(nfIDInstance);
      } catch (error) {
        console.error("Error initializing NFID:", error);
        setError("Failed to initialize NFID.");
      }
    };

    initNFID();
  }, []);


  const handleNFIDCall = async () => {
    //current time NFID call the mainnet canister if your backend on mainnet then use the env file if you are on local then use my canister id backend which is deployed over mainnet

    
    // const canisterArray = ["fnrir-yiaaa-aaaak-qirwa-cai"];
    const canisterArray = [process.env.CANISTER_ID_NFID_LOGIN_BACKEND];
    
    if (nfid) {
      try {
        const delegationResult = await nfid.getDelegation({ targets: canisterArray });
        const theUserPrincipal = Principal.from(delegationResult.getPrincipal()).toText();
        console.log(theUserPrincipal);
        setDelegation(theUserPrincipal);
      } catch (error) {
        console.error("Error during NFID call:", error);
        setError("Failed to get NFID delegation.");
      }
    } else {
      console.warn("NFID is not initialized.");
      setError("NFID is not initialized.");
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {nfid ? (
        <>
          <div>NFID Initialized</div>
          <button onClick={handleNFIDCall}>Make NFID Call</button>
          {delegation && <div><b>Principal_Id:</b> {(delegation)}</div>}
        </>
      ) : (
        <div>Loading NFID...</div>
      )}
    </div>
  );
};

export default App;
