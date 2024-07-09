const fetchCandidates = async (contractAddress) => {
    try {
      const response = await fetch(`http://localhost:5000/candidates/${contractAddress}`);
      const data = await response.json();
      console.log('Candidates:', data);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };
const updateVoteCount = async (contractAddress, id, account) => {
  try {
    //console.log(account);
    const response = await fetch(`http://localhost:5000/candidates/${contractAddress}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Vote count updated successfully', data.transactionHash);
      return(data)
    } else {
      const errorText = await response.text()
      console.log(errorText);
      throw new Error(errorText.reason)
    }
  } catch (error) {
    throw (error);
  }
};
//updateVoteCount("0x6Fe58Ef5078a80b207692b1BA4a47fFc377BCd39",0,"0x794fAD73Cd684068b3793B51c243DaeB639B9d15")
fetchCandidates("0x6Fe58Ef5078a80b207692b1BA4a47fFc377BCd39")