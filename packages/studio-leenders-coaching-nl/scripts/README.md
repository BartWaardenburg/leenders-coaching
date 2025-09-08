# Content Operations

This directory contains scripts and tools for content operations and dataset management.

## 🚀 Features

- **Dataset Aliases**: Blue/green deployments with atomic switching
- **Content Seeding**: Automated content creation and seeding scripts

## 📁 Structure

```
scripts/
├── content-seeding/           # Content seeding scripts
├── dataset-aliases.ts         # Dataset alias management
└── README.md                  # This file
```

## 🌐 Dataset Aliases

### Blue/Green Deployment

```bash
# List all aliases
pnpm run dataset:list

# Create a new alias
pnpm run dataset:create staging production-v1

# Clone a dataset for testing
pnpm run dataset:clone production production-v2

# Update alias (atomic switch)
pnpm run dataset:update production production-v2

# Full blue/green deployment
pnpm run dataset:deploy production-v2
```

### Blue/Green Workflow

1. **Clone**: `pnpm run dataset:clone production production-v2`
2. **Test**: Validate the new dataset
3. **Deploy**: `pnpm run dataset:deploy production-v2`
4. **Verify**: Check that the switch was successful

## 🔒 Security & Validation

### Environment Variables

Required environment variables:

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
EDITOR_SANITY_AUTH_TOKEN=your_token
```

## 🚨 Best Practices

### Blue/Green Deployment

1. **Test thoroughly**: Validate the new dataset completely
2. **Monitor traffic**: Watch for issues after the switch
3. **Have rollback ready**: Be prepared to switch back quickly
4. **Communicate**: Notify team of deployment windows
5. **Document changes**: Keep records of what was deployed

## 🔧 Troubleshooting

### Common Issues

**Dataset alias update fails:**

- Ensure target dataset exists
- Check permissions
- Verify dataset is ready for production

### Getting Help

1. Check the dataset alias logs for specific errors
2. Validate your environment setup
3. Review the dataset alias code for issues

## 📚 Additional Resources

- [Dataset Management](https://www.sanity.io/docs/content-lake/datasets)
- [Sanity CLI](https://www.sanity.io/docs/cli)

---

_This system provides enterprise-grade content operations with zero downtime deployments._
