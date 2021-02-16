export default [
  {
    source: 'abstract',
    target: 'abstract'
  },
  {
    source: 'description',
    target: 'abstract',
    when: {
      source: {
        abstract: false
      },
      target: false
    }
  },
  {
    source: 'dateRead',
    target: 'accessed',
    when: {
      source: {
        '@type': 'Message'
      },
      target: {
        type: 'personal_communication'
      }
    }
  },
  {
    source: 'holdingArchive / name',
    target: 'archive',
    when: {
      source: {
        '@type': 'ArchiveComponent'
      }
    }
  },
  {
    source: 'isPartOf / holdingArchive / name',
    target: 'archive',
    when: {
      source: {
        '@type': 'ArchiveComponent',
        'holdingArchive / name': false
      },
      target: false
    }
  },
  {
    source: 'isPartOf / name',
    target: 'archive_collection'
  },
  {
    source: 'itemLocation',
    target: 'archive_location',
    when: {
      source: {
        '@type': 'ArchiveComponent'
      }
    }
  },
  {
    source: 'isPartOf / itemLocation',
    target: 'archive_location',
    when: {
      source: {
        '@type': 'ArchiveComponent',
        itemLocation: false
      },
      target: false
    }
  },
  {
    source: 'holdingArchive / location',
    target: 'archive-place'
  },
  {
    source: 'isPartOf / holdingArchive / location',
    target: 'archive-place',
    when: {
      source: {
        'holdingArchive / location': false
      },
      target: false
    }
  },
  {
    source: 'author',
    target: 'author'
  },
  {
    source: 'creator',
    target: 'author',
    when: {
      source: {
        author: false
      },
      target: false
    }
  },
  {
    source: 'maintainer',
    target: 'author',
    when: {
      source: {
        author: false,
        creator: false
      },
      target: false
    }
  },
  {
    source: 'sender',
    target: 'author',
    when: {
      source: {
        '@type': 'Message',
        author: false,
        creator: false,
        maintainer: false
      },
      target: false
    }
  },
  {
    source: 'lyricist',
    target: 'author',
    when: {
      source: {
        '@type': 'MusicComposition',
        author: false,
        creator: false,
        maintainer: false,
        sender: false
      },
      target: false
    }
  },
  {
    source: 'spokenByCharacter',
    target: 'author',
    when: {
      source: {
        '@type': 'Quotation',
        author: false,
        creator: false,
        maintainer: false,
        sender: false,
        lyricist: false
      },
      target: false
    }
  },
  {
    source: 'artist',
    target: 'author',
    when: {
      source: {
        '@type': 'VisualArtwork',
        author: false,
        creator: false,
        maintainer: false,
        sender: false,
        lyricist: false,
        spokenByCharacter: false
      },
      target: false
    }
  },
  {
    source: 'agent',
    target: 'author',
    when: {
      source: {
        '@type': 'Event',
        author: false,
        creator: false,
        maintainer: false,
        sender: false,
        lyricist: false,
        spokenByCharacter: false,
        artist: false
      },
      target: false
    }
  },
  {
    source: 'legislationDate',
    target: 'available-date',
    when: {
      source: {
        '@type': 'Legislation'
      },
      target: {
        type: ['bill', 'legislation']
      }
    }
  },
  {
    source: 'dateReceived',
    target: 'available-date',
    when: {
      source: {
        '@type': 'Message',
        legislationDate: false
      },
      target: false
    }
  },
  {
    source: 'organizer',
    target: 'chair',
    when: {
      source: {
        '@type': '???'
      }
    }
  },
  {
    source: 'position',
    target: 'chapter-number'
  },
  {
    source: 'isPartOf',
    target: ['collection-editor', 'collection-title'],
    convert: Converters.COLLECTION
  },
  {
    source: 'position',
    target: 'collection-number'
  },
  {
    source: 'episodeNumber',
    target: 'collection-number',
    when: {
      source: {
        '@type': 'Episode',
        position: false
      },
      target: false
    }
  },
  {
    source: 'creator',
    target: 'compiler',
    when: {
      source: {
        '@type': 'Collection'
      }
    }
  },
  {
    source: 'composer',
    target: 'composer',
    when: {
      source: {
        '@type': ['MusicComposition', 'Event']
      }
    }
  },
  {
    source: 'musicBy',
    target: 'composer',
    when: {
      source: {
        '@type': ['VideoObject', 'Movie', 'TVSeries', 'RadioSeries', 'VideoGameSeries'],
        composer: false
      },
      target: false
    }
  },
  {
    source: 'isPartOf',
    target: ['container-author', 'container-title'],
    convert: Converters.CONTAINER
  },
  {
    source: 'includedInDataCatalog',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'Dataset',
        isPartOf: false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: 'inDefinedTermSet',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'DefinedTerm',
        isPartOf: false,
        includedInDataCatalog: false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: '^includedComposition',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'MusicComposition',
        isPartOf: false,
        includedInDataCatalog: false,
        inDefinedTermSet: false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: '^track',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'MusicRecording',
        isPartOf: false,
        includedInDataCatalog: false,
        inDefinedTermSet: false,
        '^includedComposition': false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: 'inPlaylist',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'MusicRecording',
        isPartOf: false,
        includedInDataCatalog: false,
        inDefinedTermSet: false,
        '^includedComposition': false,
        '^track': false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: 'inAlbum',
    target: ['container-author', 'container-title'],
    when: {
      source: {
        '@type': 'MusicRecording',
        isPartOf: false,
        includedInDataCatalog: false,
        inDefinedTermSet: false,
        '^includedComposition': false,
        '^track': false,
        inPlaylist: false
      },
      target: false
    },
    convert: Converters.CONTAINER
  },
  {
    source: 'contributor',
    target: 'contributor'
  },
  {
    source: 'colorist',
    target: 'contributor',
    when: {
      source: {
        '@type': 'VisualArtwork',
        contributor: false
      },
      target: false
    }
  },
  {
    source: 'inker',
    target: 'contributor',
    when: {
      source: {
        '@type': 'VisualArtwork',
        contributor: false,
        colorist: false
      },
      target: false
    }
  },
  {
    source: 'letterer',
    target: 'contributor',
    when: {
      source: {
        '@type': 'VisualArtwork',
        contributor: false,
        colorist: false,
        inker: false
      },
      target: false
    }
  },
  {
    source: 'penciler',
    target: 'contributor',
    when: {
      source: {
        '@type': 'VisualArtwork',
        contributor: false,
        colorist: false,
        inker: false,
        letterer: false
      },
      target: false
    }
  },
  {
    source: 'creator',
    target: 'curator',
    when: {
      source: {
        '@type': 'ArchiveComponent'
      }
    }
  },
  {
    source: 'size',
    target: 'dimensions'
  },
  {
    source: 'duration',
    target: 'dimensions',
    when: {
      source: {
        '@type': ['Movie', 'MusicRecording', 'Audiobook'],
        size: false
      },
      target: false
    }
  },
  {
    source: 'fileSize',
    target: 'dimensions',
    when: {
      source: {
        '@type': 'SoftwareApplication',
        size: false,
        duration: false
      },
      target: false
    }
  },
  {
    source: ['width', 'height', 'depth'],
    target: 'dimensions',
    when: {
      source: {
        '@type': 'VisualArtwork',
        size: false,
        duration: false,
        fileSize: false
      },
      target: false
    }
  },
  {
    source: 'director',
    target: 'director',
    when: {
      source: {
        '@type': ['Episode', 'CreativeWorkSeason', 'VideoObject', 'Movie', 'TVSeries', 'RadioSeries', 'MovieSeries', 'VideoGameSeries']
      },
      target: {
        type: ['broadcast', 'motion_picture']
      }
    }
  },
  {
    source: 'identifier',
    target: 'DOI'
  },
  {
    source: 'sameAs',
    target: 'DOI',
    when: {
      source: {
        identifier: false
      },
      target: false
    }
  },
  {
    source: 'editEIDR',
    target: 'DOI',
    when: {
      source: {
        identifier: false,
        sameAs: false
      },
      target: false
    }
  },
  {
    source: 'titleEIDR',
    target: 'DOI',
    when: {
      source: {
        identifier: false,
        sameAs: false,
        editEIDR: false
      },
      target: false
    }
  },
  {
    source: 'bookEdition',
    target: 'edition',
    when: {
      source: {
        '@type': 'Book'
      },
      target: {
        type: 'book'
      }
    }
  },
  {
    source: 'printEdition',
    target: 'edition',
    when: {
      source: {
        '@type': 'NewsArticle',
        bookEdition: false
      },
      target: false
    }
  },
  {
    source: 'editor',
    target: 'editor'
  },
  {
    source: 'isPartOf / editor',
    target: 'editorial-director'
  },
  {
    source: 'recordedAt / name',
    target: 'event'
  },
  {
    source: ['recordedAt / startDate', 'recordedAt / endDate'],
    target: 'event-date'
  },
  {
    source: 'recorderAt / location',
    target: 'event-place'
  },
  {
    source: 'recordedAt / name',
    target: 'event-title'
  },
  {
    source: 'publicationType',
    target: 'genre',
    when: {
      source: {
        '@type': 'MedicalScholarlyArticle'
      }
    }
  },
  {
    source: 'legislationType',
    target: 'genre',
    when: {
      source: {
        '@type': 'Legislation',
        publicationType: false
      },
      target: false
    }
  },
  {
    source: 'mapType',
    target: 'genre',
    when: {
      source: {
        '@type': 'Map',
        publicationType: false,
        legislationType: false
      },
      target: false
    }
  },
  {
    source: 'inSupportOf',
    target: 'genre',
    when: {
      source: {
        '@type': 'Thesis',
        publicationType: false,
        legislationType: false,
        mapType: false
      },
      target: false
    }
  },
  {
    source: 'artform',
    target: 'genre',
    when: {
      source: {
        '@type': 'VisualArtwork',
        publicationType: false,
        legislationType: false,
        mapType: false,
        inSupportOf: false
      },
      target: false
    }
  },
  {
    source: '@id',
    target: 'id'
  },
  {
    source: 'illustrator',
    target: 'illustrator',
    when: {
      source: {
        '@type': 'Book'
      },
      target: {
        type: 'book'
      }
    }
  },
  {
    source: 'identifier',
    target: 'ISAN'
  },
  {
    source: 'isbn',
    target: 'ISBN',
    when: {
      source: {
        '@type': 'Book'
      },
      target: {
        type: 'book'
      }
    }
  },
  {
    source: 'identifier',
    target: 'ISCI'
  },
  {
    source: 'identifier',
    target: 'ISMN'
  },
  {
    source: 'isrcCode',
    target: 'ISRC',
    when: {
      source: {
        '@type': 'MusicRecording'
      }
    }
  },
  {
    source: 'isPartOf / issn',
    target: 'ISSN',
    when: {
      source: {
        '@type': 'CreativeWorkSeries'
      }
    }
  },
  {
    source: 'issn',
    target: 'ISSN',
    when: {
      source: {
        '@type': ['Blog', 'DataSet', 'WebSite', 'BookSeries'],
        'isPartOf / issn': false
      },
      target: false
    }
  },
  {
    source: 'issueNumber',
    target: 'issue',
    when: {
      source: {
        '@type': 'PublicationIssue'
      }
    }
  },
  {
    source: 'datePublished',
    target: 'issued'
  },
  {
    source: 'dateCreated',
    target: 'issued',
    when: {
      source: {
        datePublished: false
      },
      target: false
    }
  },
  {
    source: 'dateModified',
    target: 'issued',
    when: {
      source: {
        datePublished: false,
        dateCreated: false
      },
      target: false
    }
  },
  {
    source: 'datePosted',
    target: 'issued',
    when: {
      source: {
        '@type': ['SpecialAnnouncement', 'RealEstateListing'],
        datePublished: false,
        dateCreated: false,
        dateModified: false
      },
      target: false
    }
  },
  {
    source: ['startDate', 'endDate'],
    target: 'issued',
    when: {
      source: {
        '@type': ['CreativeWorkSeason', 'CreativeWorkSeries', 'BookSeries', 'Action'],
        datePublished: false,
        dateCreated: false,
        dateModified: false,
        datePosted: false
      },
      target: false
    }
  },
  {
    source: 'iswcCode',
    target: 'ISWC',
    when: {
      source: {
        '@type': 'MusicComposition'
      }
    }
  },
  {
    source: 'jurisdiction',
    target: 'jurisdiction',
    when: {
      source: {
        '@type': 'Legislation'
      },
      target: {
        type: ['bill', 'legislation']
      }
    }
  },
  {
    source: 'legislationJurisdiction',
    target: 'jurisdiction',
    when: {
      source: {
        '@type': 'Legislation',
        jurisdiction: false
      },
      target: false
    }
  },
  {
    source: 'keywords',
    target: 'keyword'
  },
  {
    source: 'inLanguage',
    target: 'language',
    when: {
      source: {
        '@type': ['Action', 'Event']
      }
    }
  },
  {
    source: 'artworkSurface',
    target: 'medium',
    when: {
      source: {
        '@type': 'VisualArtwork'
      },
      target: {
        type: 'graphic'
      }
    }
  },
  {
    source: 'material',
    target: 'medium',
    when: {
      source: {
        artworkSurface: false
      },
      target: false
    }
  },
  {
    source: 'readBy',
    target: 'narrator',
    when: {
      source: {
        '@type': 'Audiobook'
      }
    }
  },
  {
    source: 'comment',
    target: 'note'
  },
  {
    source: 'reportNumber',
    target: 'number',
    when: {
      source: {
        '@type': 'Report'
      },
      target: {
        type: 'report'
      }
    }
  },
  {
    source: 'seasonNumber',
    target: 'number',
    when: {
      source: {
        '@type': 'CreativeWorkSeason',
        reportNumber: false
      },
      target: false
    }
  },
  {
    source: 'numberOfPages',
    target: 'number-of-pages',
    when: {
      source: {
        '@type': 'Book'
      },
      target: {
        type: 'book'
      }
    }
  },
  {
    source: ['pageStart', 'pageEnd'],
    target: 'number-of-pages',
    when: {
      source: {
        '@type': ['Article', 'Chapter', 'PublicationIssue', 'PublicationVolume'],
        numberOfPages: false
      },
      target: false
    }
  },
  {
    source: 'numTracks',
    target: 'number-of-volumes',
    when: {
      source: {
        '@type': 'MusicPlaylist'
      }
    }
  },
  {
    source: 'numberOfEpisodes',
    target: 'number-of-volumes',
    when: {
      source: {
        '@type': 'CreativeWorkSeason',
        numTracks: false
      },
      target: false
    }
  },
  {
    source: 'recordedAt / organizer',
    target: 'organizer'
  },
  {
    source: 'isBasedOn',
    target: ['original-author', 'original-date', 'original-publisher', 'original-publisher-place', 'original-title'],
    convert: Converters.ORIGINAL
  },
  {
    source: 'translationOfWork',
    target: ['original-author', 'original-date', 'original-publisher', 'original-publisher-place', 'original-title'],
    when: {
      source: {
        isBasedOn: false
      },
      target: false
    },
    convert: Converters.ORIGINAL
  },
  {
    source: 'pagination',
    target: 'page',
    when: {
      source: {
        '@type': ['Article', 'Chapter', 'PublicationIssue', 'PublicationVolume']
      },
      target: {
        type: ['article', 'article-magazine', 'chapter']
      }
    }
  },
  {
    source: ['pageStart', 'pageEnd'],
    target: 'page',
    when: {
      source: {
        '@type': ['Article', 'Chapter', 'PublicationIssue', 'PublicationVolume'],
        pagination: false
      },
      target: false
    }
  },
  {
    source: 'printPage',
    target: 'page',
    when: {
      source: {
        '@type': 'NewsArticle',
        pagination: false,
        pageStart: false,
        pageEnd: false
      },
      target: false
    }
  },
  {
    source: 'pageStart',
    target: 'page-first',
    when: {
      source: {
        '@type': ['Article', 'Chapter', 'PublicationIssue', 'PublicationVolume']
      },
      target: {
        type: ['article', 'article-magazine', 'chapter']
      }
    }
  },
  {
    source: 'printPage',
    target: 'page-first',
    when: {
      source: {
        '@type': 'NewsArticle',
        pageStart: false
      },
      target: false
    }
  },
  {
    source: 'position',
    target: 'part'
  },
  {
    source: 'actor',
    target: 'performer',
    when: {
      source: {
        '@type': ['Episode', 'CreativeWorkSeason', 'VideoObject', 'Movie', 'TVSeries', 'RadioSeries', 'MovieSeries', 'VideoGameSeries', 'Event']
      },
      target: {
        type: ['broadcast', 'motion_picture']
      }
    }
  },
  {
    source: 'performer',
    target: 'performer',
    when: {
      source: {
        '@type': 'Event',
        actor: false
      },
      target: false
    }
  },
  {
    source: 'identifier',
    target: 'PMCID'
  },
  {
    source: 'identifier',
    target: 'PMID'
  },
  {
    source: 'producer',
    target: 'producer'
  },
  {
    source: 'publisher',
    target: 'publisher'
  },
  {
    source: 'publisherImprint',
    target: 'publisher',
    when: {
      source: {
        publisher: false
      },
      target: false
    }
  },
  {
    source: 'productionCompany',
    target: 'publisher',
    when: {
      source: {
        '@type': ['CreativeWorkSeason', 'Episode', 'MediaObject', 'Movie', 'MovieSeries', 'RadioSeries', 'TVSeries', 'VideoGameSeries', 'TVSeries', 'VideoGameSeries'],
        publisher: false,
        publisherImprint: false
      },
      target: false
    }
  },
  {
    source: 'publisher / location',
    target: 'publisher-place'
  },
  {
    source: 'publisherImprint / location',
    target: 'publisher-place',
    when: {
      source: {
        'publisher / location': false
      },
      target: false
    }
  },
  {
    source: 'publisher / workLocation',
    target: 'publisher-place',
    when: {
      source: {
        'publisher / location': false,
        'publisherImprint / location': false
      },
      target: false
    }
  },
  {
    source: 'publisher / homeLocation',
    target: 'publisher-place',
    when: {
      source: {
        'publisher / location': false,
        'publisherImprint / location': false,
        'publisher / workLocation': false
      },
      target: false
    }
  },
  {
    source: 'productionCompany / homeLocation',
    target: 'publisher-place',
    when: {
      source: {
        '@type': ['CreativeWorkSeason', 'Episode', 'MediaObject', 'Movie', 'MovieSeries', 'RadioSeries', 'TVSeries', 'VideoGameSeries', 'TVSeries'],
        'publisher / location': false,
        'publisherImprint / location': false,
        'publisher / workLocation': false,
        'publisher / homeLocation': false
      },
      target: false
    }
  },
  {
    source: 'recipient',
    target: 'recipient',
    when: {
      source: {
        '@type': ['Message', 'CommunicateAction']
      },
      target: {
        type: ['personal_communication', 'speech']
      }
    }
  },
  {
    source: 'itemReviewed',
    target: ['reviewed-author', 'reviewed-genre', 'reviewed-title'],
    convert: Converters.REVIEWED
  },
  {
    source: 'author',
    target: 'script-writer',
    when: {
      source: {
        '@type': 'Movie'
      }
    }
  },
  {
    source: 'articleSection',
    target: 'section',
    when: {
      source: {
        '@type': 'Article'
      },
      target: {
        type: ['article', 'article-magazine']
      }
    }
  },
  {
    source: 'printSection',
    target: 'section',
    when: {
      source: {
        '@type': 'NewsArticle',
        articleSection: false
      },
      target: false
    }
  },
  {
    source: 'creator',
    target: 'series-creator'
  },
  {
    source: 'author',
    target: 'series-creator',
    when: {
      source: {
        creator: false
      },
      target: false
    }
  },
  {
    source: 'creativeWorkStatus',
    target: 'status'
  },
  {
    source: 'legislationLegalForce',
    target: 'status',
    when: {
      source: {
        '@type': 'Legislation',
        creativeWorkStatus: false
      },
      target: false
    }
  },
  {
    source: 'dateSent',
    target: 'submitted',
    when: {
      source: {
        '@type': 'Message'
      },
      target: {
        type: 'personal_communication'
      }
    }
  },
  {
    source: 'name',
    target: 'title'
  },
  {
    source: 'headline',
    target: 'title',
    when: {
      source: {
        name: false
      },
      target: false
    }
  },
  {
    source: 'workTranslation / headline',
    target: 'translated-title'
  },
  {
    source: 'translator',
    target: 'translator'
  },
  {
    source: '@type',
    target: 'type'
  },
  {
    source: 'url',
    target: 'URL'
  },
  {
    source: 'legislationIdentifier',
    target: 'URL',
    when: {
      source: {
        '@type': 'Legislation',
        url: false
      },
      target: false
    }
  },
  {
    source: 'downloadUrl',
    target: 'URL',
    when: {
      source: {
        '@type': 'SoftwareApplication',
        url: false,
        legislationIdentifier: false
      },
      target: false
    }
  },
  {
    source: 'installUrl',
    target: 'URL',
    when: {
      source: {
        '@type': 'SoftwareApplication',
        url: false,
        legislationIdentifier: false,
        downloadUrl: false
      },
      target: false
    }
  },
  {
    source: 'codeRepository',
    target: 'URL',
    when: {
      source: {
        '@type': 'SoftwareSourceCode',
        url: false,
        legislationIdentifier: false,
        downloadUrl: false,
        installUrl: false
      },
      target: false
    }
  },
  {
    source: 'webFeed',
    target: 'URL',
    when: {
      source: {
        '@type': ['DataFeed', 'URL'],
        url: false,
        legislationIdentifier: false,
        downloadUrl: false,
        installUrl: false,
        codeRepository: false
      },
      target: false
    }
  },
  {
    source: 'version',
    target: 'version'
  },
  {
    source: 'softwareVersion',
    target: 'version',
    when: {
      source: {
        '@type': 'SoftwareApplication',
        version: false
      },
      target: false
    }
  },
  {
    source: 'volumeNumber',
    target: 'volume',
    when: {
      source: {
        '@type': 'PublicationVolume'
      }
    }
  },
  {
    source: 'isPartOf / name',
    target: 'volume-title'
  }
]