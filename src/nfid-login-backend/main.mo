actor {
    public query func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public type Icrc28TrustedOriginsResponse = {
        trusted_origins : [Text];
    };

    // Equivalent to the Rust function that returns the record type
    public func icrc28_trusted_origins() : async Icrc28TrustedOriginsResponse {
        let trusted_origins = ["https://fkqof-vqaaa-aaaak-qirwq-cai.icp0.io", "http://localhost:3000", "http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943", "http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai", "http://127.0.0.1:4943", "http://localhost:4200"];

        return {
            trusted_origins = trusted_origins;
        };
    };

};
