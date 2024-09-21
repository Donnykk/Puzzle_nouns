import torch
import torch.nn as nn
import torch.optim as optim

# Generator Network
class Generator(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(Generator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.ReLU(True),
            nn.Linear(256, 512),
            nn.ReLU(True),
            nn.Linear(512, 1024),
            nn.ReLU(True),
            nn.Linear(1024, output_dim),
            nn.Tanh()
        )

    def forward(self, x):
        return self.main(x)

# Discriminator Network
class Discriminator(nn.Module):
    def __init__(self, input_dim):
        super(Discriminator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(input_dim, 512),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.main(x)


# Image dimensions (e.g., 32x32 pixel art)
image_size = 32 * 32 * 3  # For RGB pixel art

# Initialize models
# Input is the BERT embedding size (768)
generator = Generator(input_dim=768, output_dim=image_size)
discriminator = Discriminator(input_dim=image_size)

# Loss function and optimizer
criterion = nn.BCELoss()
optimizerG = optim.Adam(generator.parameters(), lr=0.0002)
optimizerD = optim.Adam(discriminator.parameters(), lr=0.0002)

# Training loop
def train_gan(epochs, batch_size, combined_embedding):
    for epoch in range(epochs):
        # Generate fake NFT image from combined embedding
        fake_images = generator(combined_embedding)

        # Train Discriminator on real (use any dataset here) and fake images
        real_labels = torch.ones(batch_size, 1)
        fake_labels = torch.zeros(batch_size, 1)

        # Train on real images
        optimizerD.zero_grad()
        real_output = discriminator(real_images)
        real_loss = criterion(real_output, real_labels)
        real_loss.backward()

        # Train on fake images
        fake_output = discriminator(fake_images.detach())
        fake_loss = criterion(fake_output, fake_labels)
        fake_loss.backward()
        optimizerD.step()

        # Train Generator
        optimizerG.zero_grad()
        fake_output = discriminator(fake_images)
        gen_loss = criterion(fake_output, real_labels)
        gen_loss.backward()
        optimizerG.step()

        if epoch % 100 == 0:
            print(
                f"Epoch [{epoch}/{epochs}] | Generator Loss: {gen_loss.item()} | Discriminator Loss: {fake_loss.item()}")


# Example: Train for 1000 epochs
train_gan(epochs=1000, batch_size=32, combined_embedding=combined_embedding)
