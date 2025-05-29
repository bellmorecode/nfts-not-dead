-- add zombie record. 
Declare @storage_path as nvarchar(500) = 'https://bellmorecode.blob.core.windows.net/cdn/notdead/squaddies/halo_grifter.png'
Declare @collection_name as nvarchar(500) = 'Grifter Squaddies'
Declare @tokenId as nvarchar(100) = '701'
Declare @name as nvarchar(200) = 'Grifter Squaddies #701'
Declare @collectionId as UNIQUEIDENTIFIER
--Declare 


select top 1 @collectionId = Id from NNDGameCollections where [Name] = @collection_name

select * from NNDGameTokens

Insert into NNDGameTokens ([CollectionId], [ToKenId], [Name], ImageUrl, [Metadata], [MarketplaceLink], [IsFake])
            values (@collectionId, @tokenId, @name, @storage_path, 'TBD', '[FAKE]', 1)

