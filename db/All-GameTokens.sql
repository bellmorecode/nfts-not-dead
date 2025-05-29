select 
    a1.Id, a1.Name, a1.ImageUrl, a1.TokenId, a1.CollectionId, a2.Name [CollectionName], a2.ContractAddress, a2.MarketplaceLink
From [NNDGameTokens] a1 
inner join [NNDGameCollections] a2 on a1.CollectionId = a2.Id