USE [master]
GO
/****** Object:  Database [Hangman]    Script Date: 2023/06/20 17:05:43 ******/
CREATE DATABASE [Hangman]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Hangman', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Hangman.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Hangman_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Hangman_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Hangman] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Hangman].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Hangman] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Hangman] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Hangman] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Hangman] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Hangman] SET ARITHABORT OFF 
GO
ALTER DATABASE [Hangman] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Hangman] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Hangman] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Hangman] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Hangman] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Hangman] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Hangman] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Hangman] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Hangman] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Hangman] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Hangman] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Hangman] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Hangman] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Hangman] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Hangman] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Hangman] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Hangman] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Hangman] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Hangman] SET  MULTI_USER 
GO
ALTER DATABASE [Hangman] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Hangman] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Hangman] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Hangman] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Hangman] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Hangman] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Hangman] SET QUERY_STORE = OFF
GO
USE [Hangman]
GO
/****** Object:  Table [dbo].[GameLog]    Script Date: 2023/06/20 17:05:43 ******/
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
/****** Object:  Table [dbo].[User]    Script Date: 2023/06/20 17:05:43 ******/
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
/****** Object:  Table [dbo].[Words]    Script Date: 2023/06/20 17:05:43 ******/
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
/****** Object:  Index [UC_User]    Script Date: 2023/06/20 17:05:43 ******/
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
/****** Object:  StoredProcedure [dbo].[sp_createGameLog]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_createGameLog] 
	-- Add the parameters for the stored procedure here
	@UserName VARCHAR (MAX)

AS
BEGIN
	DECLARE
		@userId BIGINT,
		@word VARCHAR(MAX),
		@wordId BIGINT,
		@gameId uniqueidentifier = NEWID()
	SET NOCOUNT ON;

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
/****** Object:  StoredProcedure [dbo].[sp_getGamelog_GameId]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getGamelog_GameId]
	-- Add the parameters for the stored procedure here
	@GameId uniqueidentifier
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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
/****** Object:  StoredProcedure [dbo].[sp_getGamelog_UserName]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getGamelog_UserName]
	-- Add the parameters for the stored procedure here
	@UserName VARCHAR(MAX)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
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
/****** Object:  StoredProcedure [dbo].[sp_getUser]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getUser]
	-- Add the parameters for the stored procedure here
	@UserName Varchar(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TOP 1 UserName FROM [User] WHERE UserName = @UserName
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertUser]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_insertUser]
	-- Add the parameters for the stored procedure here
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
/****** Object:  StoredProcedure [dbo].[sp_updateGamelog]    Script Date: 2023/06/20 17:05:43 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_updateGamelog]	-- Add the parameters for the stored procedure here
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
ALTER DATABASE [Hangman] SET  READ_WRITE 
GO


USE [master]
GO
/****** Object:  Database [Identity_Server]    Script Date: 2023/06/20 17:06:35 ******/
CREATE DATABASE [Identity_Server]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Identity_Server', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Identity_Server.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Identity_Server_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Identity_Server_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Identity_Server] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Identity_Server].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Identity_Server] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Identity_Server] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Identity_Server] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Identity_Server] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Identity_Server] SET ARITHABORT OFF 
GO
ALTER DATABASE [Identity_Server] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Identity_Server] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Identity_Server] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Identity_Server] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Identity_Server] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Identity_Server] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Identity_Server] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Identity_Server] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Identity_Server] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Identity_Server] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Identity_Server] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Identity_Server] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Identity_Server] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Identity_Server] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Identity_Server] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Identity_Server] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Identity_Server] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Identity_Server] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Identity_Server] SET  MULTI_USER 
GO
ALTER DATABASE [Identity_Server] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Identity_Server] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Identity_Server] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Identity_Server] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Identity_Server] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Identity_Server] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Identity_Server] SET QUERY_STORE = OFF
GO
USE [Identity_Server]
GO
/****** Object:  Table [dbo].[UserDetail]    Script Date: 2023/06/20 17:06:35 ******/
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
/****** Object:  StoredProcedure [dbo].[sp_getUserDetail]    Script Date: 2023/06/20 17:06:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_getUserDetail]
	-- Add the parameters for the stored procedure here
	@UserName VARCHAR(255)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TOP 1 
	salt,
	saltedHash
	FROM UserDetail 
	WHERE UserName = @UserName 
	AND LastValid > GETDATE()
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insertUserDetail]    Script Date: 2023/06/20 17:06:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_insertUserDetail]
	-- Add the parameters for the stored procedure here
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
/****** Object:  StoredProcedure [dbo].[sp_updateUserDetail]    Script Date: 2023/06/20 17:06:35 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[sp_updateUserDetail]
	-- Add the parameters for the stored procedure here
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
GO
USE [master]
GO
ALTER DATABASE [Identity_Server] SET  READ_WRITE 
GO
