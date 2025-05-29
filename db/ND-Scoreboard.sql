SELECT TOP (1000) [Id]
      ,[GameTokenId]
      ,[ActionName]
      ,[Result]
      ,[XPAwarded]
      ,[Account]
      ,[UserId]
      ,[CreateDate]
  FROM [dbo].[NNDGameActivity]
  order by CreateDate desc

  

  