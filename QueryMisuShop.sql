USE [MisuShop_V2]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[account_id] [int] IDENTITY(1,1) NOT NULL,
	[active] [bit] NULL,
	[address] [nvarchar](max) NULL,
	[admin] [bit] NULL,
	[avatar] [nvarchar](max) NULL,
	[full_name] [nvarchar](max) NULL,
	[password] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[role_code] [nvarchar](max) NULL,
	[user_name] [nvarchar](max) NULL,
	[email] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[town] [nvarchar](max) NULL,
	[district] [nvarchar](max) NULL,
	[city] [nvarchar](max) NULL,
	[town_id] [int] NULL,
	[district_id] [int] NULL,
	[city_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[account_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Blog]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blog](
	[blog_id] [int] IDENTITY(1,1) NOT NULL,
	[content_html] [nvarchar](max) NULL,
	[descript] [nvarchar](max) NULL,
	[title] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[blog_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[brand_id] [int] IDENTITY(1,1) NOT NULL,
	[brand_code] [nvarchar](max) NULL,
	[brand_name] [nvarchar](max) NULL,
	[status] [int] NULL,
	[image] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[category_code] [nvarchar](max) NULL,
	[category_name] [nvarchar](max) NULL,
	[status] [int] NULL,
	[image] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comment]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment](
	[comment_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NULL,
	[comment] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[product_id] [int] NULL,
	[star] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[comment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discount](
	[discount_id] [int] IDENTITY(1,1) NOT NULL,
	[discount_code] [nvarchar](max) NULL,
	[discount_name] [nvarchar](max) NULL,
	[start_date] [datetime] NULL,
	[end_date] [datetime] NULL,
	[value] [nvarchar](max) NULL,
	[product_id] [int] NULL,
	[created_at] [datetime] NULL,
	[status] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[discount_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[account_id] [int] NULL,
	[cusomter_type] [nvarchar](max) NULL,
	[order_code] [nvarchar](max) NULL,
	[seller] [nvarchar](max) NULL,
	[phone_seller] [nvarchar](max) NULL,
	[coupon] [float] NULL,
	[payment_type] [int] NULL,
	[bought_type] [nvarchar](max) NULL,
	[waiting] [bit] NULL,
	[data_cart] [nvarchar](max) NULL,
	[address] [nvarchar](max) NULL,
	[full_name] [nvarchar](max) NULL,
	[note] [nvarchar](max) NULL,
	[order_item] [nvarchar](max) NULL,
	[phone] [nvarchar](max) NULL,
	[status] [int] NULL,
	[type_payment] [int] NULL,
	[fee_ship] [decimal](18, 0) NULL,
	[id_city] [int] NULL,
	[id_district] [int] NULL,
	[id_ward] [int] NULL,
	[total] [decimal](18, 0) NULL,
	[created_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[type] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_code] [nvarchar](max) NULL,
	[brand_id] [int] NULL,
	[category_id] [int] NULL,
	[origin] [nvarchar](max) NULL,
	[product_name] [nvarchar](max) NULL,
	[status] [int] NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductAttribute]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductAttribute](
	[product_attribue_id] [int] IDENTITY(1,1) NOT NULL,
	[size] [nvarchar](max) NULL,
	[color] [nvarchar](max) NULL,
	[price] [decimal](18, 0) NULL,
	[product_id] [int] NULL,
	[amount] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_attribue_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductDetail]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductDetail](
	[product_detail_id] [int] IDENTITY(1,1) NOT NULL,
	[detail] [nvarchar](max) NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImage]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImage](
	[product_image_id] [int] IDENTITY(1,1) NOT NULL,
	[image] [nvarchar](max) NULL,
	[product_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[role_id] [int] IDENTITY(1,1) NOT NULL,
	[role_code] [nvarchar](max) NULL,
	[role_name] [nvarchar](max) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[deleted_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Account] ON 
GO
INSERT [dbo].[Account] ([account_id], [active], [address], [admin], [avatar], [full_name], [password], [phone], [role_code], [user_name], [email], [created_at], [updated_at], [deleted_at], [town], [district], [city], [town_id], [district_id], [city_id]) VALUES (1, NULL, NULL, 1, NULL, NULL, N'123', NULL, N'001', N'admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 
GO
INSERT [dbo].[Brand] ([brand_id], [brand_code], [brand_name], [status], [image], [created_at], [updated_at], [deleted_at]) VALUES (1, N'BRAND_QEOHVSBL', N'VANS', 1, N'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAA1CAMAAABMd4TfAAAAmVBMVEX////VGSAAAADSAAD66OjUCxXfZWfUAA5GRkbdX2Lkh4f8/Pz11dbv7+/VFR3b29vdW1777u7i4uJRUVHZPUHtsrM5OTkuLi7R0dH9+PiQkJCnp6dtbW1ycnLYNjrvvL3ie3y2traFhYXxxMXbUlTrpafmjpDgcnTWIif34ODonZ4SEhJZWVkjIyNjY2PBwcHXLDHaR0qcnJyLHo5RAAAE1UlEQVRYhe2X53LrOAxGKTEyEzV3qrh3yzX2+z/cEgBF0b6+d6Vkdnd2JvhhUWyH/AhANGM/9h9Z9ob2svKrVofb5WjhQ6XPv2W1NtzyHMfx5nZVEMfO1y2+1eKuOPT1Mqtqxr+BdbxWLS5tjs+sqrWH479ofFeLy+biaZFvnJb9RfvY1OOGKLSohN7iQj7qjf6GfaLQQ/Pu4fvqH+fS/tblKzma02yOrAiLbkNugefJy3DvgFeJLRQ304EysyK2U+9Tn8qtz+n0c0vl2U1A3O79WinD2ACF1e7QtVbx6cXKeFF27Ah4DU2Z4xq6a45Ho5yEb5twDyB0PLVeSPWQ4liYyT68qiPIIoCbOVjrkVvUC96HLdK2nCqc5x4loP0DVytjuBiHfLpr7bklWy1bV0dKXoUpNivTlsnexHV41+ZyEw0zDmmjAXfIzbYwXeN8VIsppMxAmut1LC5mGU7R76/X61vxEvHSaGewLVvyW4wBZWVvzcXgLrk4wms1DSJrQpjlgDvHL0pBAnIre5fc2AkqnTHteHx9CP8A+I3hFyiOGZtWucsX6LswLQprcR0VQIa7ouPwBBetYdCMG3DkhWH1UczgO6V8zRelJ2ku+fRbq+QqjSh81UDeNL3uMGp9jBwxNxKogw6t6ACuR9+vzkdcclmx41xodEMwibW3wgZiC1PEXs0YDwyXz8gHYuP3oNdqPuWoWRXs9WxvrjbEwPAQB8a00IXhDvW9wObiiOFA2MFez3B2p0pH+JES/uawmVdJRXMzHlfcLpieRLc3scLcqSgH0HnBZwY3B75ezatdGLl4g9RxBkHXkEsRZJLT6vlqh/KZ/fjccMHNYg+PIYBM01Bn+g6Z86F0qe/DonTySsebV3ILSui3ud8S4IpeM6y+zWl/xOTHDxkeXkae9cB9E8aftzgwFsJ7ui/VNEzH2qswVMwNJCxzpeU3GN7kzz4v/Vvte8tms2ZJa0Oiom/GUBqYJnxVV4E1PPWG5lCe07o65T+Ugcoam1Wzb0QWolXF6rJU6BZ8lrNCufzmZavhZjNcYSR0m12yfuzH/ucWNbyVfMuCJE/dVBVG0j32oTB+B5PXSGIhgdXkVJbtKJGqz0LKoEdVfWiW8s5YmsiIsZNcqu7nY49h/QIhY6hkipOfzd7Ol7arWk8u2oixPpUWET1d6DnR5VRVXhVX1bat5rGbYJ8Fw/ZAVQOI4XwMppwwGNUeHw33PYlU68h1814qXbenOl3aaZpGaoq7eoIETFWc3UmaZg/ca6/Xa0PzFcYp2AnmCaCZ1vPIHbnRuzRCL09Bf8Ske1FlQAFXzdeDl5F6Rrpf4ubUY3K/j4l7XywWyFUbHKUIOwFBuvkRiU/cfnBZPp0yAHHySakz0zovn7laXq0zDlMa95fuJHFHIIdaQZCD8k/cV5a4YzqQXHU6SynfAZFImeTP3MtyeSJufr/f8RgYbra9xPWyi3te5Hgef8/NoUt0UYNNJ4VIH1amudX5gs+SnwRHIIIEE9bTipyAe4+UqSnH+PzVgjN1zpnNvVo9zr9y0SItNBxIAq1L93hdXJfa1ZTJ8uhegkGkZIGijJtzU1AKVGMZLh48ZqK5/T9xVU8tRBDoGAse8pd+owf8BmQPzerXHl52eez6Y/+S/QUP0lsbtzCC0wAAAABJRU5ErkJggg==', NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[Category] ON 
GO
INSERT [dbo].[Category] ([category_id], [category_code], [category_name], [status], [image], [created_at], [updated_at], [deleted_at]) VALUES (1, N'CATE_wjyt2vq9', N'SNEAKER', 1, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Category] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 
GO
INSERT [dbo].[Product] ([product_id], [product_code], [brand_id], [category_id], [origin], [product_name], [status], [created_at], [updated_at], [deleted_at]) VALUES (1, N'MC4xO', 1, 1, N'Viet Nam', N'Vans Vip pro', 1, CAST(N'2023-05-18T16:27:05.410' AS DateTime), NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductAttribute] ON 
GO
INSERT [dbo].[ProductAttribute] ([product_attribue_id], [size], [color], [price], [product_id], [amount]) VALUES (9, N'56', N'blue', CAST(200000 AS Decimal(18, 0)), 1, 5)
GO
SET IDENTITY_INSERT [dbo].[ProductAttribute] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductDetail] ON 
GO
INSERT [dbo].[ProductDetail] ([product_detail_id], [detail], [product_id]) VALUES (1, N'Table', 1)
GO
SET IDENTITY_INSERT [dbo].[ProductDetail] OFF
GO
ALTER TABLE [dbo].[Comment]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[Discount]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([account_id])
REFERENCES [dbo].[Account] ([account_id])
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD FOREIGN KEY([brand_id])
REFERENCES [dbo].[Brand] ([brand_id])
GO
ALTER TABLE [dbo].[Product]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[Category] ([category_id])
GO
ALTER TABLE [dbo].[ProductAttribute]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[ProductDetail]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
ALTER TABLE [dbo].[ProductImage]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[Product] ([product_id])
GO
/****** Object:  StoredProcedure [dbo].[sp_ProductLoadListAll]    Script Date: 5/19/2023 5:59:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_ProductLoadListAll]
AS
	SELECT pa.product_attribue_id, pa.size, pa.color, pa.price,p.*
	FROM ProductAttribute pa
	LEFT JOIN Product p
	ON pa.product_id = p.product_id

GO
