USE [ShoeShop]
GO
/****** Object:  Table [dbo].[Shoes]    Script Date: 10/15/2022 11:08:17 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Shoes]') AND type in (N'U'))
DROP TABLE [dbo].[Shoes]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 10/15/2022 11:08:17 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Category]') AND type in (N'U'))
DROP TABLE [dbo].[Category]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 10/15/2022 11:08:17 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Brand]') AND type in (N'U'))
DROP TABLE [dbo].[Brand]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 10/15/2022 11:08:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[BrandId] [int] IDENTITY(1,1) NOT NULL,
	[BrandName] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[BrandId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 10/15/2022 11:08:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Shoes]    Script Date: 10/15/2022 11:08:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Shoes](
	[ShoesId] [int] IDENTITY(1,1) NOT NULL,
	[ShoesName] [nvarchar](255) NULL,
	[Size] [nvarchar](50) NULL,
	[Color] [nvarchar](50) NULL,
	[Origin] [nvarchar](50) NULL,
	[Price] [decimal](18, 0) NULL,
	[Gender] [bit] NULL,
	[Descrip] [nvarchar](max) NULL,
	[Rating] [int] NULL,
	[Amount] [int] NULL,
	[CategoryId] [int] NULL,
	[BrandId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ShoesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (1, N'NIKE')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (2, N'ADIDAS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (3, N'VANS')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (4, N'Gucci')
GO
INSERT [dbo].[Brand] ([BrandId], [BrandName]) VALUES (5, N'MLB')
GO
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON 
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (1, N'Sneaker')
GO
INSERT [dbo].[Category] ([CategoryId], [CategoryName]) VALUES (2, N'Sports')
GO
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Shoes] ON 
GO
INSERT [dbo].[Shoes] ([ShoesId], [ShoesName], [Size], [Color], [Origin], [Price], [Gender], [Descrip], [Rating], [Amount], [CategoryId], [BrandId]) VALUES (1, N'Giày thể thao 1', N'41', N'White', N'Việt Name', CAST(240000 AS Decimal(18, 0)), 1, N'Mới', 1, 20, 1, 1)
GO
INSERT [dbo].[Shoes] ([ShoesId], [ShoesName], [Size], [Color], [Origin], [Price], [Gender], [Descrip], [Rating], [Amount], [CategoryId], [BrandId]) VALUES (2, N'Giày thể thao 2', N'36', N'Black', N'Việt Name', CAST(300000 AS Decimal(18, 0)), 1, N'Mới', 1, 20, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[Shoes] OFF
GO
