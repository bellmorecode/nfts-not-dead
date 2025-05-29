select top 5 [CreateDate], [Player], [GameType], [TurnCount], [Responses], id from [GameRecord] order by CreateDate desc

select top 10 [CreateDate], [Player], [ActionName], [Message], [Reward], id from [UserGameInteraction] order by [CreateDate] desc

delete from [GameRecord] where id = '79f05fcc-d629-4be8-9931-cf4238a3d850'
delete from [UserGameInteraction] where id = '9664b3bd-dbbe-491a-b24c-3f5c558de196'