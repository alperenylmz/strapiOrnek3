import type { Schema, Attribute } from '@strapi/strapi';

export interface TokenBlocksTokenChartBlocks extends Schema.Component {
  collectionName: 'components_token_blocks_token_chart_blocks';
  info: {
    displayName: 'TokenChartBlocks';
    description: '';
  };
  attributes: {
    Number: Attribute.String;
    Change: Attribute.String;
    Title: Attribute.String;
  };
}

export interface TokenSectionTokenChartSection extends Schema.Component {
  collectionName: 'components_token_section_token_chart_sections';
  info: {
    displayName: 'TokenChartSection';
    description: '';
  };
  attributes: {
    CoinLinks: Attribute.Component<'coin-place-link.coin-place-links', true>;
    ChartImage: Attribute.Media<'images'>;
    TokenChartBlock: Attribute.Component<
      'token-blocks.token-chart-blocks',
      true
    >;
    ColorPercentages: Attribute.Component<
      'chart-percentages.chart-color-percentages',
      true
    >;
  };
}

export interface TeamBlocksTeamBlocks extends Schema.Component {
  collectionName: 'components_team_blocks_team_blocks';
  info: {
    displayName: 'TeamBlocks';
    description: '';
  };
  attributes: {
    Photo: Attribute.Media<'images'>;
    NameSurname: Attribute.Text;
    Position: Attribute.Text;
    url: Attribute.String;
  };
}

export interface StrategicSectionStrategicSection extends Schema.Component {
  collectionName: 'components_strategic_section_strategic_sections';
  info: {
    displayName: 'StrategicSection';
  };
  attributes: {
    StrategicTitle: Attribute.String;
    StrategicDescription: Attribute.Blocks;
    StrategicBlock: Attribute.Component<
      'strategic-section.strategic-block',
      true
    >;
  };
}

export interface StrategicSectionStrategicBlock extends Schema.Component {
  collectionName: 'components_strategic_section_strategic_blocks';
  info: {
    displayName: 'StrategicBlock';
  };
  attributes: {
    StrategicIcon: Attribute.Media<'images'>;
    StrategicTitle: Attribute.String;
    StrategicDescription: Attribute.Blocks;
  };
}

export interface PartnerSectionPartnerSection extends Schema.Component {
  collectionName: 'components_partner_section_partner_sections';
  info: {
    displayName: 'PartnerSection';
  };
  attributes: {
    OurPartners: Attribute.String;
    OurPartnersDescription: Attribute.Blocks;
    OurPartnersBlocks: Attribute.Component<
      'partner-section.our-partners-block',
      true
    >;
  };
}

export interface PartnerSectionOurPartnersBlock extends Schema.Component {
  collectionName: 'components_partner_section_our_partners_blocks';
  info: {
    displayName: 'OurPartnersBlock';
    description: '';
  };
  attributes: {
    PartnerIcon: Attribute.Media<'images'>;
    PartnerDescription: Attribute.Blocks;
    url: Attribute.String;
  };
}

export interface CoinSitesCoinSites extends Schema.Component {
  collectionName: 'components_coin_sites_coin_sites';
  info: {
    displayName: 'coinSites';
    description: '';
  };
  attributes: {
    coinPlaces: Attribute.Media<'images'>;
  };
}

export interface RoadmapListListView extends Schema.Component {
  collectionName: 'components_roadmap_list_list_views';
  info: {
    displayName: 'ListView';
    description: '';
  };
  attributes: {
    Quarter: Attribute.Integer;
    List: Attribute.Component<'repeatable-text.list-view', true>;
  };
}

export interface RoadmapOverTheYearsRoadmapOverTheYears
  extends Schema.Component {
  collectionName: 'components_roadmap_over_the_years_roadmap_over_the_years';
  info: {
    displayName: 'RoadmapOverTheYears';
    description: '';
  };
  attributes: {
    Year: Attribute.BigInteger;
    List: Attribute.Component<'roadmap-list.list-view', true>;
  };
}

export interface CoinPlaceLinkCoinPlaceLinks extends Schema.Component {
  collectionName: 'components_coin_place_link_coin_place_links';
  info: {
    displayName: 'CoinPlaceLinks';
    description: '';
  };
  attributes: {
    PlaceImage: Attribute.Media<'images'>;
    url: Attribute.Text;
    name: Attribute.String;
  };
}

export interface CoinCodeBlockCoinCodeBlock extends Schema.Component {
  collectionName: 'components_coin_code_block_coin_code_blocks';
  info: {
    displayName: 'CoinCodeBlock';
  };
  attributes: {
    Number: Attribute.Integer;
    DecimalText: Attribute.String;
    Code: Attribute.Text;
  };
}

export interface BlogPostsBlogPosts extends Schema.Component {
  collectionName: 'components_blog_posts_blog_posts';
  info: {
    displayName: 'BlogPosts';
    description: '';
  };
  attributes: {
    Image: Attribute.Media<'images'>;
    PostTitle: Attribute.Text;
    miniDescription: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
  };
}

export interface BackgroundGifBackgroundVideo extends Schema.Component {
  collectionName: 'components_background_gif_background_videos';
  info: {
    displayName: 'backgroundVideo';
  };
  attributes: {
    brnBackgroundGif: Attribute.Media<'videos'>;
  };
}

export interface RepeatableTextListView extends Schema.Component {
  collectionName: 'components_repeatable_text_list_views';
  info: {
    displayName: 'ListView';
  };
  attributes: {
    Substances: Attribute.Text;
    isDone: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface AboutSectionAboutSection extends Schema.Component {
  collectionName: 'components_about_section_about_sections';
  info: {
    displayName: 'About Section';
  };
  attributes: {
    CoinSites: Attribute.Component<'coin-sites.coin-sites', true>;
    Title: Attribute.String;
    Description: Attribute.Blocks;
    TotalSupply: Attribute.Integer;
    MaxSupply: Attribute.Integer;
    LineGraph: Attribute.Media<'images'>;
  };
}

export interface ChartPercentagesChartColorPercentages
  extends Schema.Component {
  collectionName: 'components_chart_percentages_chart_color_percentages';
  info: {
    displayName: 'ChartColorPercentages';
  };
  attributes: {
    Color: Attribute.String;
    PercentageTitle: Attribute.String;
    Percentage: Attribute.Integer;
  };
}

export interface BlogDetailsImageText extends Schema.Component {
  collectionName: 'components_blog_details_image_texts';
  info: {
    displayName: 'Image-Text';
  };
  attributes: {
    Description: Attribute.Blocks;
    PostImage: Attribute.Media<'images'>;
  };
}

export interface BlogDetailsBlogDetail extends Schema.Component {
  collectionName: 'components_blog_details_blog_details';
  info: {
    displayName: 'BlogDetail';
  };
  attributes: {
    Description: Attribute.Blocks;
    PostImage: Attribute.Media<'images'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'token-blocks.token-chart-blocks': TokenBlocksTokenChartBlocks;
      'token-section.token-chart-section': TokenSectionTokenChartSection;
      'team-blocks.team-blocks': TeamBlocksTeamBlocks;
      'strategic-section.strategic-section': StrategicSectionStrategicSection;
      'strategic-section.strategic-block': StrategicSectionStrategicBlock;
      'partner-section.partner-section': PartnerSectionPartnerSection;
      'partner-section.our-partners-block': PartnerSectionOurPartnersBlock;
      'coin-sites.coin-sites': CoinSitesCoinSites;
      'roadmap-list.list-view': RoadmapListListView;
      'roadmap-over-the-years.roadmap-over-the-years': RoadmapOverTheYearsRoadmapOverTheYears;
      'coin-place-link.coin-place-links': CoinPlaceLinkCoinPlaceLinks;
      'coin-code-block.coin-code-block': CoinCodeBlockCoinCodeBlock;
      'blog-posts.blog-posts': BlogPostsBlogPosts;
      'background-gif.background-video': BackgroundGifBackgroundVideo;
      'repeatable-text.list-view': RepeatableTextListView;
      'about-section.about-section': AboutSectionAboutSection;
      'chart-percentages.chart-color-percentages': ChartPercentagesChartColorPercentages;
      'blog-details.image-text': BlogDetailsImageText;
      'blog-details.blog-detail': BlogDetailsBlogDetail;
    }
  }
}
