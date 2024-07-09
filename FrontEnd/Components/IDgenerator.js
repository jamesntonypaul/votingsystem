const generateRandomId = (prefix, length) => {
    const randomId = Math.floor(Math.random() * (10 ** (length - prefix.length)));
    return `${prefix}${randomId.toString().padStart(length - prefix.length, '0')}`;
  };
  
  export const generateElectionId = () => generateRandomId('EL', 5); // Example: EL000001
  export const generateCandidateId = () => generateRandomId('CA', 5); // Example: CA000002
  export const generateVoterId = () => generateRandomId('VO', 5);     // Example: VO000003