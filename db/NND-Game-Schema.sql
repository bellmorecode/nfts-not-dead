Create Table [NNDGameCollections] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT(newid()),
    [Name] nvarchar(200) null, 
    [ContractAddress] nvarchar(200) null, 
    [MarketplaceLink] nvarchar(1000) null
)

Create Table [NNDGameTokens] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT(newid()),
    [CollectionId] UNIQUEIDENTIFIER not null, 
    [TokenId] nvarchar(200) not null, 
    [Name] nvarchar(400) not null, 
    [ImageUrl] nvarchar(400) null, 
    [Metadata] nvarchar(1000) null,
    [MarketplaceLink] nvarchar(1000) null,
    [IsFake] bit not null default(0)
)

Create Table [NNDGameActivity] (
    [Id] UNIQUEIDENTIFIER PRIMARY KEY DEFAULT(newid()),
    [GameTokenId] UNIQUEIDENTIFIER not null,
    [UserId] UNIQUEIDENTIFIER not null,
    [ActionName] nvarchar(100) not null, 
    [Result] nvarchar(100) null, 
    [XPAwarded] int not null DEFAULT(0)
)