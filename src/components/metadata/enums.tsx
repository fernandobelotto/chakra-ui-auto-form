import { businessModelType, countryCodes, personTypes, legalEntityTypes, businessTypes } from "../schema";


export const enums = {
    "businessModel": Object.values(businessModelType),
    "businessDetails.country": Object.values(countryCodes),
    "businessDetails.registeredAddress.country": Object.values(countryCodes),
    "businessDetails.tradingAddress.country": Object.values(countryCodes),
    "businessDetails.type": Object.values(businessTypes),
    "businessDetails.legalEntity": Object.values(legalEntityTypes),
    "associates[0].countryOfBirth": Object.values(countryCodes),
    "associates[0].country": Object.values(countryCodes),
    "associates[0].type": Object.values(personTypes),
};

