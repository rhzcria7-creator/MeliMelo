module Api
  module V1
    class ContactsController < ApplicationController
      def create
        @contact = Contact.new(contact_params)
        
        if @contact.save
          redirect_url = generate_mailto_link(@contact)
          render json: { success: true, redirectUrl: redirect_url }, status: :created
        else
          render json: { success: false, errors: @contact.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def contact_params
        params.require(:contact).permit(:name, :email, :message)
      end

      def generate_mailto_link(contact)
        subject = ERB::Util.url_encode("Contato MeliMelo - #{contact.name}")
        body = ERB::Util.url_encode("Nome: #{contact.name}\\nEmail: #{contact.email}\\n\\nMensagem:\\n#{contact.message}")
        to = 'melimelo.oficial@outlook.com'
        
        if contact.email.include?('@gmail.com')
          "https://mail.google.com/mail/?view=cm&fs=1&to=#{to}&su=#{subject}&body=#{body}"
        else
          "mailto:#{to}?subject=#{subject}&body=#{body}"
        end
      end
    end
  end
end
