module.exports = {
  'query': {
    'function_score': {
      'query': {
        'filtered': {
          'query': {
            'bool': {
              'should': [
                {
                  'bool': {
                    '_name': 'fallback.street',
                    'boost': 5,
                    'must': [
                      {
                        'match_phrase': {
                          'address_parts.street': 'street value'
                        }
                      }
                    ],
                    'should': [],
                    'filter': {
                      'term': {
                        'layer': 'street'
                      }
                    }
                  }
                }
              ]
            }
          },
          'filter': {
            'bool': {
              'must': [
                {
                  'terms': {
                    'layer': [
                      'test'
                    ]
                  }
                }
              ]
            }
          }
        }
      },
      'max_boost': 20,
      'functions': [
        {
          'field_value_factor': {
            'modifier': 'log1p',
            'field': 'popularity',
            'missing': 1
          },
          'weight': 1
        },
        {
          'field_value_factor': {
            'modifier': 'log1p',
            'field': 'population',
            'missing': 1
          },
          'weight': 2
        }
      ],
      'score_mode': 'avg',
      'boost_mode': 'multiply'
    }
  },
  'size': 50,
  'track_scores': true,
  'sort': [
    '_score'
  ]
};
