SELECT TOP (1000) [Id]
      ,[Name]
      ,[Address]
      ,[ChainId]
      ,[TokenType]
      ,[ProposedById]
      ,[ApprovedById]
      ,[ApprovedOn]
      ,[IsActive]
  FROM [dbo].[Contracts] where [Name] like 'Pending%'

  update Contracts set [Name] = 'Cryptodickpunks', [ApprovedById] = '7008015f-b460-48ec-9482-b0e8b4a09028', [ApprovedOn] = GETUTCDATE() where [Address] = '0x21d6d0877b90457277b2e7a8717636092256fec8'
  update Contracts set [Name] = 'The Grimmers', [ApprovedById] = '7008015f-b460-48ec-9482-b0e8b4a09028', [ApprovedOn] = GETUTCDATE() where [Address] = '0x6255f0e78c520decccb5356d4f51a3df04149a3d'
  update Contracts set [Name] = '1337 Brians', [ApprovedById] = '7008015f-b460-48ec-9482-b0e8b4a09028', [ApprovedOn] = GETUTCDATE() where [Address] = '0x5519dc53d698ce6b9eefc71efc454e4b269307b9'
  update Contracts set [Name] = '8BRP', [ApprovedById] = '7008015f-b460-48ec-9482-b0e8b4a09028', [ApprovedOn] = GETUTCDATE() where [Address] = '0xd4e05b7fa05528f7683e3c226abc0168727419f2'
  update Contracts set [Name] = 'TOKYO PUNKS | MINIMALS BY SABET', [ApprovedById] = '7008015f-b460-48ec-9482-b0e8b4a09028', [ApprovedOn] = GETUTCDATE() where [Address] = '0x677426801fc7859df466626bc1a834ce5e363b99'