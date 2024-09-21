from transformers import BertTokenizer, BertModel
import torch

# Initialize pre-trained BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Function to get embeddings from the text description of characteristics
def get_embedding(text):
    inputs = tokenizer(text, return_tensors="pt", max_length=128,
                       truncation=True, padding="max_length")
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state.mean(dim=1)


# Example NFT traits
nft1_traits = "hat: wizard, glasses: round, body: pixelated"
nft2_traits = "hat: baseball cap, glasses: square, body: pixelated"
nft3_traits = "hat: party hat, glasses: aviator, body: pixelated"

# Get embeddings for each NFT trait
nft1_embedding = get_embedding(nft1_traits)
nft2_embedding = get_embedding(nft2_traits)
nft3_embedding = get_embedding(nft3_traits)

# Combine embeddings to generate a new NFT embedding
combined_embedding = (nft1_embedding + nft2_embedding + nft3_embedding) / 3
