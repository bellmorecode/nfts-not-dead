select * from [NNDGameCollections]

--Alter Table [NNDGameCollections] add [ChainId] nvarchar(20) not null 

insert into [NNDGameCollections] ([Name], [ContractAddress], [MarketplaceLink]) values ('Grifter Squaddies', '0xa94c652c16525e6b7cac82a34eab18b5174ad23c', 'https://opensea.io/collection/grifterssquaddies')