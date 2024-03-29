USE [master]
GO
CREATE DATABASE [Hangman]
GO
USE [Hangman]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GameLog](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [bigint] NOT NULL,
	[GameId] [uniqueidentifier] NOT NULL,
	[Word] [varchar](max) NOT NULL,
	[WinLose] [bit] NULL,
	[GameDate] [datetime] NOT NULL,
 CONSTRAINT [PK_GameLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Words](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Word] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Words] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Words] ON 
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (1, N'123456')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (2, N'123456789')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (3, N'12345')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (4, N'qwerty')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (5, N'password')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (6, N'12345678')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (7, N'111111')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (8, N'123123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (9, N'1234567890')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (10, N'1234567')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (11, N'qwerty123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (12, N'0')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (13, N'1q2w3e')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (14, N'aa12345678')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (15, N'abc123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (16, N'password1')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (17, N'1234')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (18, N'qwertyuiop')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (19, N'123321')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (20, N'password123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (21, N'1q2w3e4r5t')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (22, N'iloveyou')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (23, N'654321')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (24, N'666666')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (25, N'987654321')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (26, N'123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (27, N'123456a')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (28, N'qwe123')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (29, N'1q2w3e4r')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (30, N'7777777')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (31, N'1qaz2wsx')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (32, N'123qwe')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (33, N'zxcvbnm')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (34, N'121212')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (35, N'asdasd')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (36, N'a123456')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (37, N'555555')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (38, N'dragon')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (39, N'112233')
GO
INSERT [dbo].[Words] ([Id], [Word]) VALUES (40, N'123123123')
GO
SET IDENTITY_INSERT [dbo].[Words] OFF
GO
SET ANSI_PADDING ON
GO
ALTER TABLE [dbo].[User] ADD  CONSTRAINT [UC_User] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[GameLog]  WITH CHECK ADD  CONSTRAINT [FK_GameLog_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([Id])
GO
ALTER TABLE [dbo].[GameLog] CHECK CONSTRAINT [FK_GameLog_UserId]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_createGameLog] 
	@UserName VARCHAR (MAX)

AS
BEGIN
	DECLARE
		@userId BIGINT,
		@word VARCHAR(MAX),
		@wordId BIGINT,
		@gameId uniqueidentifier = NEWID()
	SET NOCOUNT ON;

  MERGE INTO [dbo].[User] AS tgt
	USING (SELECT @UserName AS UserName) AS src
	ON tgt.UserName = src.UserName
	WHEN NOT MATCHED
	THEN INSERT  ( UserName, CreatedDate ) 
		VALUES ( @UserName, GETDATE() );  

	SET @userId = (SELECT TOP 1 Id FROM dbo.[User] WHERE UserName = @UserName)

	SELECT	@word = w.Word, 
			@wordId = w.Id 
	FROM 
		(	
		SELECT TOP 1 Word, Id 
		FROM Words
		ORDER BY NEWID()
		) AS w


    INSERT INTO [dbo].[GameLog]
           ([UserId]
           ,[GameId]
           ,[Word]
           ,[WinLose]
           ,[GameDate])
     VALUES
           (@userId,
		   @gameId,
		   @word,
		   NULL,
		   GETDATE())

	SELECT @gameId AS GameId,
			@word AS Word
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_getGamelog_GameId]
	@GameId uniqueidentifier
AS
BEGIN

	SET NOCOUNT ON;

	SELECT u.UserName,
	GameId,
	Word,
	WinLose,
	GameDate
	FROM GameLog g
	INNER JOIN dbo.[User] u
	ON u.Id = g.UserId
	WHERE GameId = @GameId

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_getGamelog_UserName]
	@UserName VARCHAR(MAX)
AS
BEGIN
	SET NOCOUNT ON;

	SELECT u.UserName,
	Word,
	WinLose,
	GameDate
	FROM GameLog g
	INNER JOIN dbo.[User] u
	ON u.Id = g.UserId
	WHERE u.UserName = @UserName

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_getUser]
	@UserName Varchar(255)
AS
BEGIN

	SET NOCOUNT ON;

	SELECT TOP 1 UserName FROM [User] WHERE UserName = @UserName
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_insertUser]
	@UserName Varchar(Max)
AS
BEGIN
	INSERT INTO [dbo].[User]
           ([UserName],
		   [CreatedDate])
     VALUES
           (@UserName,
		   GETDATE()
		   )

END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_updateGamelog]	
	@GameId uniqueidentifier,
	@result bit
AS
BEGIN
	UPDATE [dbo].[GameLog]
	SET [WinLose] = @result
	WHERE GameId = @GameId
END
GO

USE [master]
GO
CREATE DATABASE [Identity_Server]
GO
USE [Identity_Server]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[salt] [varchar](max) NOT NULL,
	[saltedHash] [varchar](max) NOT NULL,
	[FirstValid] [datetime] NOT NULL,
	[LastValid] [datetime] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_getUserDetail]
	@UserName VARCHAR(255)
AS
BEGIN

	SET NOCOUNT ON;

	SELECT TOP 1 
	salt,
	saltedHash
	FROM UserDetail 
	WHERE UserName = @UserName 
	AND LastValid > GETDATE()
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_insertUserDetail]
	@UserName varchar(255),
    @salt varchar(max),
    @saltedHash varchar(max)
AS
BEGIN
	INSERT INTO [dbo].[UserDetail]
           ([UserName]
           ,[salt]
           ,[saltedHash]
           ,[FirstValid]
           ,[LastValid])
     VALUES
           (@UserName,
		   @salt,
		   @saltedHash,
		   GETDATE(),
		   '9999-12-31')
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_updateUserDetail]
	@UserName varchar(255),
    @salt varchar(max),
    @saltedHash varchar(max)
AS
BEGIN
	--soft delete record
	UPDATE [dbo].[UserDetail]
	SET [LastValid] = GETDATE()
	WHERE [UserName] = @UserName
	AND [LastValid] = '9999-12-31'

	--insert new record
	INSERT INTO [dbo].[UserDetail]
           ([UserName]
           ,[salt]
           ,[saltedHash]
           ,[FirstValid]
           ,[LastValid])
     VALUES
           (@UserName,
		   @salt,
		   @saltedHash,
		   GETDATE(),
		   '9999-12-31')
END
